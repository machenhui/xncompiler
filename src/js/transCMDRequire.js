/**
 * 负责将文件中CMD 方式引入的require 进行转意
 */

/**
 * 转化callBackFn 中的require
 * TODO 使用uglify2 重写该逻辑
 */
var UglifyJS = require("uglify-js");
//var getModulePath = require("./transCommonJS").getModulePath;
var transDeps = require("./transDeps");
var getModulePath;
module.exports.setGetModulePath = function(_getModulePath){
    getModulePath = _getModulePath;
}


function isInScopeChainVariables(scope, name) {
    var vars = scope.variables._values;
    if (Object.prototype.hasOwnProperty.call(vars, "$" + name)) {
        return true;
    }
    if (scope.parent_scope) {
        return isInScopeChainVariables(scope.parent_scope, name);
    }
    return false;
}
function make_node(ctor, orig, props) {
    if (!props) props = {};
    if (orig) {
        if (!props.start) props.start = orig.start;
        if (!props.end) props.end = orig.end;
    }
    return new ctor(props);
};
function getRequireDeps(fileName,content,namespace){
    //console.log(fileName,content.length);
    var toplevel_ast = null;
    toplevel_ast = UglifyJS.parse(content, {
        filename:fileName,
        toplevel:toplevel_ast
    });
    toplevel_ast.figure_out_scope();
    var result = [];

    var deep_clone = new UglifyJS.TreeTransformer(function(node, descend){
        if(node instanceof UglifyJS.AST_Call && node.expression.name == "require"&&node.args.length==1){
            result.push(node.args[0].value);
            var node_new = make_node(UglifyJS.AST_Symbol,toplevel_ast);
            //node_new.value = node.args[0].value;
            node_new.name = namespace+"[\""+getModulePath(namespace,node.args[0].value,fileName)+"\"]";
            descend(node,this);
            return node_new;
        }
        descend(node,this);
        return node;
    });

    var walker = new UglifyJS.TreeWalker(function (node,descend) {
        if ( node instanceof UglifyJS.AST_Call) {
            var ex = node.expression;
            var name = ex.name;
            //ex.scope && && !isInScopeChainVariables(ex.scope, name)
            if ( name&&ex.name == "require" ) {
                if(node.args.length == 1){
                    result.push(node.args[0].value);
                    var parent = walker.parent();
                    if(parent instanceof UglifyJS.AST_VarDef){
                        //console.log(parent.TYPE);
                        var node_new = make_node(UglifyJS.AST_Symbol,toplevel_ast);
                        //node_new.value = node.args[0].value;
                        node_new.name = namespace+"[\""+getModulePath(namespace,node.args[0].value,fileName)+"\"]";
                        parent.value = node_new;
                        //return true;
                    }else if(parent instanceof UglifyJS.AST_Call){
                        var node_new = make_node(UglifyJS.AST_Symbol,toplevel_ast);
                        //node_new.value = node.args[0].value;
                        node_new.name = namespace+"[\""+getModulePath(namespace,node.args[0].value,fileName)+"\"]";
                        //node = node_new;
                        var args = parent.args;
                        for(var i = 0,l=args.length;i<l;i++){
                            if(args[i] == node){
                                args[i] = node_new;
                            }
                        }
                        //return node_new;
                    }

                }

            }
        }
    });
    //toplevel_ast.walk(walker);
    var topAst = toplevel_ast.transform(deep_clone);
    //返回顶级语法树和 附加的depends对象
    return {
        topAST:topAst,
        additionDepends:result
    }
}

/**
 * 记录状态，去除 因 callBack里面的require 造成的参数多余
 */
var moduleStateMap = {};
module.exports.moduleStateMap = moduleStateMap;
module.exports.transCallBack = function(namespace,content,moduleName,filePath,options){

    var rs_deps = getRequireDeps(filePath,content,namespace);
    var requires = [];
    if(rs_deps.additionDepends&&rs_deps.additionDepends.length>0){
        var compressor = UglifyJS.Compressor({
            warnings:false
        });
        var compressed_ast = rs_deps.topAST.transform(compressor);
        content = compressed_ast.print_to_string();
        requires = rs_deps.additionDepends;
    }
    if(moduleName){
        var getInfo = new Function("define",content);
    }else{
        var getInfo = new Function("require",content);
    }
    try{
        var info = {};
        if(moduleName){
            function define(deps, callBackFn) {
                if(Object.prototype.toString.call(deps) != "[object Array]"){
                    deps = [deps];
                }
                if(arguments.length==1){
                    var tmp = deps;
                    callBackFn = deps;
                    deps = [];
                }
                if(arguments.length==3){
                    deps = arguments[1];
                    callBackFn = arguments[2];
                }
                //console.log(44444444,arguments.length,callBackFn,arguments);
                if(!deps){
                    console.log(arguments);
                }
                //console.log(callBackFn.toString());
                info = {
                    moduleName:moduleName,
                    deps: deps,
                    callBackFn: callBackFn.toString()
                };
            }

            getInfo(define);

        }else{
            function require(deps, callBackFn) {
                if(Object.prototype.toString.call(deps) != "[object Array]"){
                    deps = [deps];
                }
                info = {
                    deps: deps,
                    callBackFn: callBackFn.toString()
                };
            }
            getInfo(require);
        }


    }catch(e){
        console.log(e);
    }
    //console.log(requires);
    if(requires&&requires.length>0){
        moduleStateMap[filePath] = info.deps.length;
        for(var l=requires.length;l--; ){
            info.deps.push(requires[l]);
        }
    }
    transDeps(info.deps,moduleName,filePath);
    var rsString;
    try{
        //加入隐含的deps r.js 就会分析这些隐含依赖
        if(moduleName){
            rsString = "define('"+info.moduleName+"',[\""+info.deps.join("\",\"")+"\"],"+info.callBackFn+")";
        }else{
            rsString = "require([\""+info.deps.join("\",\"")+"\"],"+info.callBackFn+")";
        }
    }catch(e){

        console.log(info);
        throw e;
    }
    if(options&&options.returnDeps){
        return {
            moduleName:moduleName,
            deps:info.deps,
            rsString:rsString
        }
    }else{
        return rsString;
    }


}
