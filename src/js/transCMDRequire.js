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
function getRequireDeps(fileName,content,namespace,moduleName){
    //console.log(fileName,content.length);
    var toplevel_ast = null;
    toplevel_ast = UglifyJS.parse(content, {
        filename:fileName,
        toplevel:toplevel_ast
    });
    toplevel_ast.figure_out_scope();
    var result = [];
    var isCMDMode = false;
    var isNeedAddReturn = false;
    var deep_clone = new UglifyJS.TreeTransformer(function(node, descend){
        if(node instanceof UglifyJS.AST_Call && node.expression.name == "require"&&node.args.length==1){
            result.push(node.args[0].value);
            var node_new = make_node(UglifyJS.AST_Symbol,toplevel_ast);
            //node_new.value = node.args[0].value;
            var requireModuleName = transDeps([node.args[0].value],moduleName,fileName);
            //node_new.name = namespace+"[\""+getModulePath(namespace,node.args[0].value,fileName)+"\"]";
            node_new.name = namespace+"[\""+getModulePath(namespace,requireModuleName[0],fileName)+"\"]";
            //console.log(node_new.name,requireModuleName);
            descend(node,this);
            return node_new;
        }
        if(node instanceof UglifyJS.AST_Call && node.expression.name == "define"){
            var lastArg = node.args[node.args.length - 1];
            if(lastArg.TYPE == "Function"){
                var mode = 0;
                if(lastArg.argnames[0] && lastArg.argnames[0].name == "require"){
                    mode += 1;
                }
                if(lastArg.argnames[1] && lastArg.argnames[1].name == "exports"){
                    mode += 2;
                }
                if(lastArg.argnames[2] && lastArg.argnames[2].name == "module"){
                    mode += 4;
                }
                if(mode == 1 || mode == 3 || mode == 7){
                    isCMDMode = true;
                    lastArg.argnames.forEach(function(item,index){
                        //console.log(index,"========",item.name);
                    });
                    if(mode == 3 || mode == 7){
                        isNeedAddReturn = true;
                    }
                    if(isNeedAddReturn){
                        var len = lastArg.body.length;
                        if(lastArg.body[len-1].TYPE != "Return"){
                            //return module exports
                            var _top  = UglifyJS.parse("var module={exports:{}},exports=module.exports;", {
                                filename:fileName,
                                toplevel:node.body
                            });
                            len = lastArg.body.unshift(_top);
                            var _return = UglifyJS.parse(mode==3?"exports;":"module.exports;", {
                                filename:fileName,
                                toplevel:node.body
                            });
                            _return.figure_out_scope();
                            var _retAST = new UglifyJS.AST_Return(
                                {
                                    value:_return,
                                    start:lastArg.body[len-1].end,
                                    end:lastArg.body[len-1].end
                                }
                            );
                            lastArg.body[len] = _retAST;
                            //console.log(_retAST.print_to_string(),mode);
                        }
                    }

                }
            }else{
                console.log(lastArg.TYPE);
            }

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
            }else if(name&&ex.name == "define"){
                console.log(node.args);
            }
        }
    });
    //toplevel_ast.walk(walker);
    var topAst = toplevel_ast.transform(deep_clone);
    //console.log(topAst.print_to_string());
    //返回顶级语法树和 附加的depends对象
    return {
        topAST:topAst,
        isCMDMode:isCMDMode,
        additionDepends:result
    }
}

/**
 * 记录状态，去除 因 callBack里面的require 造成的参数多余
 */
var moduleStateMap = {};
module.exports.moduleStateMap = moduleStateMap;
module.exports.transCallBack = function(namespace,content,moduleName,filePath,options){
    var rs_deps = getRequireDeps(filePath,content,namespace,moduleName);
    var requires = [];
    if(rs_deps.additionDepends&&rs_deps.additionDepends.length>0){
        var compressor = UglifyJS.Compressor({
            warnings:false
        });
        var compressed_ast = rs_deps.topAST.transform(compressor);
        content = compressed_ast.print_to_string({beautify:true});
        requires = rs_deps.additionDepends;
    }else{
        //兼容处理cmd 问题
        content =  rs_deps.topAST.print_to_string({beautify:true});
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
        console.error(e);
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
    //加入隐含的deps r.js 就会分析这些隐含依赖
    if(moduleName){
        rsString = "define('"+info.moduleName+"',[\""+info.deps.join("\",\"")+"\"],"+info.callBackFn+")";
    }else{
        rsString = "require([\""+info.deps.join("\",\"")+"\"],"+info.callBackFn+")";
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
