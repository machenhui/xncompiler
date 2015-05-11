/**
 * 过滤js 文件中有关 css selector 的操作
 *  1.编译期
 *      解惑全觉的几个function
 *          getClassByName
 *          querySelectorAll
 *          querySelector
 *          Element.className 属性的访问
 *          Element.classList.add
 *                      添加某个class
 *          Element.classList.remove
 *                      删除某个class
 *          Element.classList.contains
 *                      是否包含
 *
 *  2.运行期
 *      定义方法getCSSName
 */

var funNames = {"getClassByName":1,"querySelectorAll":1,"querySelector":1};
var attributeName = {"className":1};
var ElementReference = {
    "classList":{
        "add":function(){},
        "remove":function(){},
        "contains":function(){}
    }
};
var DEF_TYPES = {
    "CLASS_NAME":1,
    "SELECTOR":2
};
var parser = require("../css/selectorParser");
var cssTransHtmlTag = require("../css/TransHtmlTag");
cssTransHtmlTag.setPrefix("xnCSSName");
function transHtmlTag(htmlTag){
    return cssTransHtmlTag(htmlTag);
}
//TODO 将selectParser 进行打包生成新文件
var xnCSSParser = parser.toString().replace(/^function\s*/i,"function xnCSSParser");
var fs = require("fs");
var Node_Path = require("path");
var pkgJSFile = require("./singleFilePackage");
function cpFile(from,to){
    var content = fs.readFileSync(from);
    fs.writeFileSync(to,content);
}
function transParser(){
    //检测指定文件是否存在
    var parserFileName = Node_Path.dirname(module.filename)+"/jsLib/xnCSSParser.js".replace(/\//gi,Node_Path.sep);
    //console.log(parserFileName,fs.existsSync(parserFileName));
    if(!fs.existsSync(parserFileName)){
        var transNodeJS = require("./transNodeJS");
        var baseDir = Node_Path.resolve(Node_Path.dirname(module.filename),"../");
        transNodeJS({
            baseDir:baseDir,
            sourceFile:"css/selectorParser.js",
            writeFile:true,
            tmpDir:"./build/xnBuildTmp2/",
            successFn:function(data){
                //console.log(data.reverse().join(";"));
                cpFile(Node_Path.dirname(module.filename)+"/jsLib/xnCSSParserSource.js","./build/xnBuildTmp2/xnCSSParser.js");
                //编译文件
                new pkgJSFile.singleFilePackage({
                    baseUrl:"./build/xnBuildTmp2/",
                    source:"xnCSSParser.js",
                    output:Node_Path.dirname(module.filename)+"/jsLib/"
                });
            }
        })
    }else{
        console.log("==xnCSSParser 已经生成==");
        xnCSSParser = fs.readFileSync(parserFileName);
    }
}
transParser();
var util = require("../util");
var UglifyJS = require("uglify-js");

function transCSSName(){
    this._init.apply(this,arguments);
}
transCSSName.prototype = {
    _init:function(options){
        this._options = util.extend({
            cssRenameMap:null,//指定cssRenameMap
            src:null ,//指定原文件,
            output:null
        },options);
        /*this._options.cssRenameMap = {
            "ttttt":"a",
            "ddd":"b",
            "ddddd":"c",
            "dddd":"e",
            "dddddddddddd":"f"
        };*/
        /*var sourceMapText = fs.readFileSync("./build/index.css.map.json");*/
        var sourceMapText = fs.readFileSync(this._options.cssRenameMap);
        this._options.cssRenameMap = JSON.parse(sourceMapText);
        var sourceMapText ="var xnCSSRenameMap="+sourceMapText;
        this.addFunText = this._initFunText(sourceMapText,xnCSSParser);
        var content = this._transSourceFile(this._options.src,this.addFunText);
        if(this._options.output){
            util.writeFile(this._options.output,content);
        }else{
            console.log(content);
        }
    },
    _transSourceFile:function(filePath,addFunText){
        var that = this;
        var fileContent = fs.readFileSync(filePath,{encoding:"utf8"});
        var topLevelAST = null;
        topLevelAST = UglifyJS.parse(addFunText+fileContent.toString(),{
            fileName:filePath,
            toplevel:topLevelAST
        });
        topLevelAST.figure_out_scope();
        var deep_clone = new UglifyJS.TreeTransformer(function(node,descend){
            that.walkASTNode(node,descend,topLevelAST);
            descend(node, this);
            return node;
        });

        var transTree = topLevelAST.transform(deep_clone);
        var content = transTree.print_to_string({ beautify: true });
        return content;
        /*var compressor1 = UglifyJS.Compressor({
            warnings:false,
            if_return:true,
            unsafe:true,
            unsafe_comps:true
            //beautify:false
        });
        //命名混淆
        transTree.mangle_names(true);
        var compressed_ast2 = transTree.transform(compressor1);
        content = compressed_ast2.print_to_string({beautify:true});*/
    },
    _initFunText:function(sourceMapText,xnCSSParser){
        var xnGetCSSNameFunText = fs.readFileSync(Node_Path.dirname(module.filename.replace(/\\/gi,"/"))+"/jsLib/xnGetCSSName.js");
        var rs = [sourceMapText,xnCSSParser,xnGetCSSNameFunText];
        return rs.join(";");
    },
    /**
     * 转换是String,还是表达式
     */
    _transClassValue:function(valueNode,TYPE,ast){
        //console.log(valueNode.TYPE);
        if(valueNode instanceof UglifyJS.AST_String){
            //如果是字符串
            switch (TYPE){
                case DEF_TYPES.CLASS_NAME:
                    if(this._options.cssRenameMap){
                        var rs = valueNode.value.split(/\s+/gi);
                        var rsT = [];
                        for(var i= 0,l=rs.length;i<l;i++){
                            var item = rs[i];
                            var rsItem = this._options.cssRenameMap[item];
                            rsT.push(rsItem?rsItem:item);
                        }
                        if(rsT&&rsT.length>0){
                            valueNode.value = rsT.join(" ");
                        }
                    };
                    break;
                case DEF_TYPES.SELECTOR:
                    if(this._options.cssRenameMap){

                        var rs = parser(valueNode.value).tokenArray;
                        if(rs&&rs.length>0){
                            var rsT = [];
                            for(var i= 0,l=rs.length;i<l;i++){
                                var item = rs[i];
                                if(item&&item.type == "className"){
                                    var text =this._options.cssRenameMap[item.text];
                                    rsT.push("."+(text?text:item.text));
                                }else if(item&&item.type == "htmlTag"){
                                    rsT.push(transHtmlTag(item.text));
                                    //console.log(4444444444444,item.text,transHtmlTag(item.text),valueNode.value);
                                }else{
                                    rsT.push(item.text);
                                }
                                valueNode.value = rsT.join("");
                            }

                        }
                    };
                    break;
                default :break;
            }
            //console.log(valueNode.value);
        }else{
            //返回调用另一个方法
            //xnQuerySelector({expression})

            var expression = new UglifyJS.AST_SymbolRef(this._defXnGetCSSName);
            //console.log(expression);
            //ast.def_function(expression);
            var args = [valueNode];
            var new_node = new UglifyJS.AST_Call({
                expression:expression,
                args:args,
                start:valueNode.start,
                end:valueNode.end,
                scope:ast
            });
            //console.log(valueNode.TYPE);
            return new_node;

        }
    },
    _checkElementReference:function(node,ast){
        var expression = node.expression;
        if(expression instanceof  UglifyJS.AST_Dot){
            if(expression.expression){
                var parentRef = ElementReference.hasOwnProperty(expression.expression.property);
                if(parentRef&&parentRef[expression.property]){
                    var rs = this._transClassValue(node.args[0],DEF_TYPES.CLASS_NAME,ast);
                    if(rs){
                        node.args[0] = rs;
                    }
                }
            }
        }
    },
    walkASTNode:function(node,descend,ast){
        //console.log("\t",node.TYPE);
        if(node instanceof UglifyJS.AST_Call){
            //console.log(node.expression.TYPE);
            //AST_SymbolRef
            if(funNames.hasOwnProperty(node.expression.name)){
                if(node.args && node.args.length>0){
                    var rs = this._transClassValue( node.args[0],DEF_TYPES.SELECTOR,ast);
                    if(rs){
                        node.args[0] = rs;
                    }
                }
            }
            //AST_Dot
            if(funNames.hasOwnProperty(node.expression.property)){
                //console.log(node.expression.property,node.TYPE,node.args.length);
                if(node.args && node.args.length>0){
                    var rs = this._transClassValue( node.args[0],DEF_TYPES.SELECTOR,ast);
                    if(rs){
                        node.args[0] = rs;
                    }
                }
            }
            this._checkElementReference(node,ast);
        }else if(node instanceof UglifyJS.AST_Dot){
            if(attributeName[node.property]){
                //console.log("\t",node.property,node.TYPE,node.expression);

                //需要判断操作符，并区分是否是读写操作
            }
            //descend(node,ast);
        }else if(node instanceof UglifyJS.AST_Assign){
            if(node.left&& (node.left instanceof UglifyJS.AST_Dot)){
                if(attributeName.hasOwnProperty(node.left.property)){
                    //console.log(node.right.value);
                    this._transClassValue( node.right,DEF_TYPES.CLASS_NAME,ast);
                }
            }
        }else if(node instanceof UglifyJS.AST_SymbolDefun&&node.name == "xnGetCSSName"){
            this._defXnGetCSSName = node;
        }
    }
};

module.exports.transCSSName = transCSSName;






