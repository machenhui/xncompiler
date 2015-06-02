/**
 * 负责执行压缩文件
 * 1.去除文件中的define 关键字
 * 2.调整完成之后，生成js 文件，然后再用google 的压缩工具，再压一次
 */

var UglifyJS = require("uglify-js");
function treeTransForm(fileName,content,_global_defs){
    var topLevelAST = null;
    topLevelAST = UglifyJS.parse(content,{
        fileName:fileName,
        toplevel:topLevelAST
    });

    topLevelAST.figure_out_scope();

    var deep_clone = new UglifyJS.TreeTransformer(function(node, descend){
        if(node instanceof UglifyJS.AST_Call && node.expression.name == "define"){
            //console.log(node.expression.name);
            //return new UglifyJS.AST_Empty();
            //console.log(deep_clone.parent());
            //var parent = deep_clone.parent();
            var tmpNode = new UglifyJS.AST_EmptyStatement({
                start:node.start,
                end:node.end
            });
            //console.log(tmpNode);
            return tmpNode;
            //console.log(node.args[0].value);
        }
        descend(node,this);
        return node;
    });
    var compressed_ast =topLevelAST.transform(deep_clone);
    content = compressed_ast.print_to_string({ beautify: true });
    //console.log(content);
    //return content;
    try{
        var compressor = UglifyJS.Compressor({
            if_return:true,
            warnings:false,
            //beautify:true,
            global_defs:_global_defs||{}
        });
    }catch(e){
        console.log(e);
    }
    //命名混淆
    //compressed_ast.mangle_names(true);
    var compressed_ast2 = compressed_ast.transform(compressor);
    content = compressed_ast2.print_to_string({beautify:true});
    return content;
}

module.exports = {
    trimDefine:function(fileName,content,_global_defs){
        return treeTransForm(fileName,content,_global_defs);
    }
}
