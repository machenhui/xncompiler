/**
 * 解析模板中
 * @type {exports}
 */
var fs = require("fs");
var htmlparser = require("htmlparser2");
var util = require("../util");


function templateParser(){
    this._init.apply(this,arguments);
}

templateParser.prototype = {
    _init:function(options){
        this._options = util.extend({
            source:"",//模板路径,指定模板目录或文件
            output:"", //指明输出路径，或者输出的文件，
            cssRenameMap:null //指明css 重命名配置文件
        },options);
        this.cssFunctionStart = "$$_cssFunctionStart_$$";
        this.cssFunctionEnd = "$$_cssFunctionEnd_$$";
        if(this._options.cssRenameMap){
            this.cssNameMap = JSON.parse(fs.readFileSync(this._options.cssRenameMap).toString());
        }

        var rs = this.transTpl(this._options.source);
        this.compileTpl(rs.source,rs.selectors);
        this.transTplJS(this._options.output);
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
            if(this.cssNameMap&&this.cssNameMap[name]){
                classNames[l] = this.cssNameMap[name];
            }
        }
        return classNames.join(" ");
    },
    _getCSSName:function(contentStr){
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
        var startStr = sourceText.substring(0,node.startIndex);
        var endStr = sourceText.substring(node.endIndex);

        return {
            before:startStr,
            end:this._transNode(node)+endStr
        };
    },
    transTpl:function(tplPath){
        var that = this;
        var testStr = fs.readFileSync(tplPath,{encoding:"utf8"});
        var nodeArray = [];
        var parser = new htmlparser.Parser({
            onopentag: function(name, attribs){
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
                    nodeArray.push({cssData:attribs['class'],startIndex:parser.startIndex+classStartIndex,endIndex:parser.startIndex+classEndIndex});
                }
            },
            ontext: function(text){
                //console.log("-->", text);
            },
            onclosetag: function(tagname){
                /*if(tagname === "script"){
                 console.log("That's it?!");
                 }*/
            }
        });
        parser.write(testStr);
        parser.end();
        return {
            source:testStr,
            selectors:nodeArray
        }
    },
    compileTpl:function(source,nodeArray){
        var rsStr = "";
        var sourceStr = source.toString();
        for(var l= nodeArray.length;l--;){
            var node = nodeArray[l];
            var rs = this._replaceHtmlEL(sourceStr,node);
            rsStr = rs.end+rsStr;
            sourceStr = rs.before;
            if(!l){
                rsStr = rs.before+rsStr;
            }
        }
        util.writeFile(this._options.output+".soy",rsStr);
        var command ='java -jar ../lightappfront/0/node_modules/grunt-closure-template/lib/SoyToJsSrcCompiler.jar  --codeStyle concat --cssHandlingScheme REFERENCE --outputPathFormat '+this._options.output+'  '+this._options.output+".soy";
        util.execSync(command);
    },
    _createCSSWrapper:function(funName,nameMap){
        var rs = "var tplCSSNameMap="+JSON.stringify(nameMap)+";";
        var funText = "function "+funName+"(className){var rs=className.split(/\\s+/gi);for(var l=rs.length;l--;){" +
            "if(tplCSSNameMap[rs[l]]){" +
            "rs[l] = tplCSSNameMap[rs[l]];" +
            "}" +
            "}" +
            "return rs.join(' ');" +
            "}";
        funText +=";\r\nconsole.log(xnGetCssName(\"baiduServiceBottomBar\"));";
        return rs+"\r\n"+funText;

    },
    transTplJS:function(outputPath){
        var content = fs.readFileSync(outputPath);
        var funName = "xnGetCssName";
        var cssWrapper = this._createCSSWrapper(funName,this.cssNameMap);
        var outputFileContent = content.toString();
        outputFileContent = outputFileContent.replace(this.cssFunctionStart,"'+"+funName+"('").replace(this.cssFunctionEnd,"')+'");
        fs.writeFileSync(outputPath,cssWrapper+";\r\n"+outputFileContent);
    }
}

module.exports = templateParser;


