/**
 * 解析模板中
 * @type {exports}
 */
var fs = require("fs");
var htmlparser = require("htmlparser2");
var util = require("../util");
var getTplDeps = require("./deps").getTplDeps;
var NPath = require("path");
var htmlTagTrans = require("./htmlTagTrans");
function templateParser(){
    this._init.apply(this,arguments);
}

templateParser.prototype = {
    _init:function(options){
        this._options = util.extend({
            source:"",//模板路径,指定模板目录或文件
            output:"", //指明输出路径，或者输出的文件，
            cssRenameMap:null, //指明css 重命名配置文件
            transCommonJS:null,
            commonJSPrefix:"template/"
        },options);
        this.cssFunctionStart = "$$_cssFunctionStart_$$";
        this.cssFunctionEnd = "$$_cssFunctionEnd_$$";
        if(this._options.cssRenameMap){
            this.cssNameMap = JSON.parse(fs.readFileSync(this._options.cssRenameMap).toString());
        }
        if(this.cssNameMap["htmlTag"]){
        	htmlTagTrans.setRenameMap(this.cssNameMap["htmlTag"]);
        }
        if(this.cssNameMap["className"]){
        	this.classNameMap = this.cssNameMap["className"];
        }
        var rs = this.transTpl(this._options.source);
        this.compileTpl(rs.source,rs.selectors);
        this.transTplJS(this._options.output,rs.tplDeps);
        if(this._options.__xnCallBack){
            this._options.__xnCallBack();
        }
    },
    _transCSSName:function(classStr){
        var classNames = classStr.split(/\s+/);
        for(var l = classNames.length;l--;){
            var name = classNames[l];
            /*if(!cssNameMap[name]){
                classNames[l] = cssNameMap[name] = cssNamePrefix+util.base54_xn(cssNameIndex++);
            }else{
                classNames[l] = cssNameMap[name];
            }*/
            if(this.classNameMap&&this.classNameMap[name]){
                classNames[l] = this.classNameMap[name];
            }
        }
        return classNames.join(" ");
    },
    _getCSSName:function(contentStr){
        if(!this.classNameMap){
            return contentStr;
        }
        if(contentStr.search(/\{/gi)!=-1){
            return this.cssFunctionStart+contentStr+this.cssFunctionEnd;
        }else{
            return this._transCSSName(contentStr);
        }
    },
    _transNode:function(node){
        var rs = "class=\""+node.cssData+"\"";
        return rs;
    },
    /**
     * 将找到class 的el 元素，进行替换
     */
    _replaceHtmlEL:function(sourceText,node){
        if(node.isCloseTag){
            //console.log(node,sourceText.substring(node.tagStarIndex,node.tagEndIndex));
            var startStr = sourceText.substring(0,node.tagStarIndex);
            var endStr = sourceText.substring(node.tagEndIndex);

            return {
                before:startStr,
                end:"div "+endStr
            };
        }else{
            var startStr = sourceText.substring(0,node.startIndex);
            //处理tag 转换
            var tagStartStr = sourceText.substring(0,node.tagStarIndex);
            var tagEndStr = sourceText.substring(node.tagEndIndex,node.startIndex);
            startStr = tagStartStr + "div " + tagEndStr;
            //console.log(node,sourceText.charAt(node.tagEndIndex),sourceText.charAt(node.endIndex));
            if(!node.cssData&&node.tagClassName){
                node.cssData = " ";
            }
            if(node.cssData&&node.tagClassName){
                node.cssData += (" "+ node.tagClassName||"");
            }
            var endStr = sourceText.substring(node.endIndex);
            //console.log(node.sourceTagName,node.tagClassName,node.cssData,this._transNode(node));
            return {
                before:startStr,
                end:this._transNode(node)+endStr
            };
        }

    },
    transTpl:function(tplPath){
        var that = this;
        var testStr = fs.readFileSync(tplPath,{encoding:"utf8"});
        var tplDeps = getTplDeps(testStr);
        var nodeArray = [];
        var parser = new htmlparser.Parser({
            onopentag: function(name, attribs){
                var eleClassName;
                if(name != "div"){
                    eleClassName = htmlTagTrans.trans(name);
                }
                if(attribs['class']){
                    var tagStr = testStr.substring(parser.startIndex,parser.endIndex);
                    var testStrr = "class=\""+attribs['class']+"\"";
                    var classStartIndex = tagStr.indexOf(testStrr);
                    var classEndIndex = classStartIndex+testStrr.length;
                    //console.log(classStartIndex,classEndIndex,tagStr,testStrr);
                    if(classStartIndex == -1){
                        process.exit(-1);
                    }
                    attribs['class'] = that._getCSSName(attribs['class']);
                    //console.log(attribs['class'] );
                    nodeArray.push({
                        cssData:attribs['class'],
                        startIndex:parser.startIndex+classStartIndex,
                        endIndex:parser.startIndex+classEndIndex,
                        sourceTagName:name,
                        tagClassName:eleClassName,
                        tagStarIndex:parser.startIndex+1,
                        tagEndIndex:parser.startIndex+1+name.length
                    });
                }
            },
            ontext: function(text){
                //console.log("-->", text);
            },
            onclosetag: function(tagname){
                /*if(tagname === "script"){
                 console.log("That's it?!");
                 }*/
                //console.log(parser);
                //调整关闭tag 的转换
                //TODO 处理自闭合标签
                var isAutoClose = testStr.charAt(parser.startIndex+1);
                var startIndex = 1;
                if(isAutoClose=="/"){
                    startIndex = 2;
                }
                var eleClassName,classStartIndex= 0,classEndIndex = 0;
                if(tagname != "div"){
                    eleClassName = htmlTagTrans.trans(tagname);
                    nodeArray.push({
                        isCloseTag:isAutoClose=="/"?true:false,
                        sourceTagName:tagname,
                        //startIndex:parser.startIndex+classStartIndex,
                        startIndex:parser.endIndex-(2-startIndex),
                        endIndex:parser.endIndex-(2-startIndex),
                        tagClassName:isAutoClose=="/"?null:eleClassName,
                        tagStarIndex:parser.startIndex+startIndex,
                        tagEndIndex:parser.startIndex+startIndex+tagname.length
                    });
                }


            }
        });
        parser.write(testStr);
        parser.end();
        return {
            source:testStr,
            selectors:nodeArray,
            tplDeps:tplDeps
        }
    },
    compileTpl:function(source,nodeArray){
        var sourceFile = this._options.source;
        if(this._options.cssRenameMap){
            var rsStr = "";
            var sourceStr = source.toString();
            for(var l= nodeArray.length;l--;){
                var node = nodeArray[l];
                var rs = this._replaceHtmlEL(sourceStr,node);
                if(rs){
                    rsStr = rs.end+rsStr;
                    sourceStr = rs.before;
                    if(!l){
                        rsStr = rs.before+rsStr;
                    }
                }
            }
            util.writeFile(this._options.output+".soy",rsStr);
            sourceFile = this._options.output+".soy";
        }
        var libPath = NPath.dirname(module.filename).replace(/\\+/gi,"/")+"/lib/SoyToJsSrcCompiler.jar";
        //--shouldProvideRequireSoyNamespaces
        var command ='java -jar '+libPath+'   --codeStyle concat --cssHandlingScheme REFERENCE --outputPathFormat '+this._options.output+'  '+sourceFile;
        util.execSync(command);
    },
    _createCSSWrapper:function(funName,nameMap){
        if(!nameMap){
            return ;
        }
        var rs = "var tplCSSNameMap="+JSON.stringify(nameMap)+";";
        var funText = "function "+funName+"(className){var rs=className.split(/\\s+/gi);for(var l=rs.length;l--;){" +
            "if(tplCSSNameMap[rs[l]]){" +
            "rs[l] = tplCSSNameMap[rs[l]];" +
            "}" +
            "}" +
            "return rs.join(' ');" +
            "}";
        //funText +=";\r\nconsole.log(xnGetCssName(\"baiduServiceBottomBar\"));";
        return rs+"\r\n"+funText;

    },
    _createCommonJSWrapper:function(deps,content){
        if(!this._options.transCommonJS){
            return content;
        }
        //TODO 提供 soyutils 路径
        if(!this._options.soyToolPath){
            console.error("请配置soyToolPath路径,默认位置lib/soyutils");
        }
        var rs = [];
        rs.push("define([],function(){");
        var requires = ["var soy = require(\""+this._options.soyToolPath+"\");"];
        for(var i= 0,l=deps.deps.length;i<l;i++){
            var item = deps.deps[i];
            requires.push(item+"=require(\""+this._options.commonJSPrefix+item.replace(/\./gi,"/")+"\");");
        }
        rs.push(content);
        rs = rs.concat(requires);
        rs.push("return "+deps.namespace+deps.tplName+";");
        rs.push("})");
        return rs.join("\r\n");
    },
    transTplJS:function(outputPath,deps){
        var content = fs.readFileSync(outputPath);
        var funName = "xnGetCssName";
        var cssWrapper = this._createCSSWrapper(funName,this.cssNameMap);
        var outputFileContent = content.toString();
        outputFileContent = outputFileContent.replace(this.cssFunctionStart,"'+"+funName+"('").replace(this.cssFunctionEnd,"')+'");
        outputFileContent = this._createCommonJSWrapper(deps,outputFileContent);
        fs.writeFileSync(outputPath,(cssWrapper?cssWrapper+";\r\n":"")+outputFileContent);
    }
}

module.exports = templateParser;


