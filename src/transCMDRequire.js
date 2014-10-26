/**
 * 负责将文件中CMD 方式引入的require 进行转意
 */

/**
 * 转化callBackFn 中的require
 * TODO 使用uglify2 重写该逻辑
 */
var UglifyJS = require("uglify-js");
var getModulePath = require("./transCommonJS").getModulePath;



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
    var walker = new UglifyJS.TreeWalker(function (node,descend) {
        if ( node instanceof UglifyJS.AST_Call) {
            var ex = node.expression;
            var name = ex.name;
            if (ex.scope && name&&ex.name == "require" && !isInScopeChainVariables(ex.scope, name)) {
                if(node.args.length == 1){
                    result.push(node.args[0].value);
                    var parent = walker.parent();
                    if(parent instanceof UglifyJS.AST_VarDef){
                        //console.log(parent.TYPE);
                        var node_new = make_node(UglifyJS.AST_Symbol,toplevel_ast);
                        //node_new.value = node.args[0].value;
                        node_new.name = namespace+"[\""+getModulePath(namespace,node.args[0].value)+"\"]";
                        parent.value = node_new;
                        return true;
                    }

                }

            }
        }
    });
    toplevel_ast.walk(walker);
    //返回顶级语法树和 附加的depends对象
    return {
        topAST:toplevel_ast,
        additionDepends:result
    }
}



module.exports.transCallBack = function(namespace,content,moduleName,filePath){


    var rs_deps = getRequireDeps(filePath,content,namespace);
    var requires = [];
    if(rs_deps.additionDepends&&rs_deps.additionDepends.length>0){
        var compressor = UglifyJS.Compressor();
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

    if(requires&&requires.length>0){
        for(var l=requires.length;l--; ){
            info.deps.push(requires[l]);
        }
    }
    //加入隐含的deps r.js 就会分析这些隐含依赖
    if(moduleName){
        return "define('"+info.moduleName+"',[\""+info.deps.join("\",\"")+"\"],"+info.callBackFn+")";
    }else{
        return "require([\""+info.deps.join("\",\"")+"\"],"+info.callBackFn+")";
    }

}
