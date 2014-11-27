var util = require("../util");
/**
 * 解析call 语句，分析依赖的模板
 * 并将模板转换成 define([deps],function(){}) 的标准形式
 *  1.找到namespace
 *  2.找到call 指令 和 和面依赖的模板
 *  3.编译成js
 *  4.将编译之后的js 包装成define 的形式
 */
var templateParser = function(){
    this._init.apply(this,arguments);
}

templateParser.prototype = {
    _init:function(options){

    },
    _parseCallFun:function(sourceText){
        //解析deps
        var deps = [];
    }
}


var tplTokens = {"namespace":1,"call":1,"template":1};
var tplTag = {
    start:"{",
    end:"}"
}

var TOKEN_STRING_TYPE={
    START:0,
    END:1,
    AUTO_CLOSE:2
}
function tplToken(){
    this._init.apply(this,arguments);
}
tplToken.prototype = {
    _init:function(name,options){
        this._options = util.extend({
            type:TOKEN_STRING_TYPE.START,
            pop:{}
        },options);
        this.pops = this._options.pop;
        this.name = name;
    }
}

/**
 * 第一个空格之前的内容为 tokenTag
 *
 */
function parseStatement(statementStr){
    var tokenTagEnd = statementStr.search(/\s+/i);
    var isEndTag = statementStr[0]=="/"?true:false;
    var tokenStr;
    if(tokenTagEnd!=0){
        tokenStr = statementStr.substring(0,tokenTagEnd);
    }
    if(isEndTag||!tokenStr||!tplTokens.hasOwnProperty(tokenStr)){
        return;
    }
    var otherStr = statementStr.substring(tokenTagEnd);
    var startPos = statementStr.search(/[^\s]/gi);
    otherStr = otherStr.substring(startPos+1);
    var nameEndPos = otherStr.search(/\s+/i);
    nameEndPos = (nameEndPos<=0?otherStr.length:nameEndPos);
    var nameStr = otherStr.substring(0,nameEndPos);
    var token;
    switch(tokenStr){
        case "namespace":
            token = new tplToken(tokenStr,{
                pop:{
                    namespace:nameStr
                }
            })
            break;
        case "call":
            token = new tplToken(tokenStr,{
                pop:{
                    tplPath:nameStr
                }
            })
            break;
        case "template":
            token = new tplToken(tokenStr,{
                pop:{
                    tplName:nameStr
                }
            })
            break;
        default :break;
    }
    return token;
}

/**
 *  找到模板，解析
 */
function parseTemplate(sourceText){
    var i = 0,l=sourceText.length;
    var inSep = false;
    var streamText = [];
    var takenArray = [];
    var tplTokenArray = [];
    var lineNum = 0,col = 0;
    while(i<l){
        var char = sourceText.charAt(i);
        switch (char){
            case tplTag.start:
                inSep = true;
                break;
            case tplTag.end:
                inSep = false;
                if(streamText.length>0){
                    takenArray.push({
                        endPoint:col,
                        lineNum:lineNum,
                        text:streamText.join("")
                    });
                    var token = parseStatement(streamText.join(""));
                    if(token){
                        tplTokenArray.push(token);
                    }
                }
                streamText = [];
                break;
            case "\r":
                var nextChar = sourceText.charAt(i+1);
                if(nextChar == "\n"){
                    i++;
                    lineNum++;
                    col = 0;
                }
                break;
            default :
                if(inSep){
                    streamText.push(char);
                }
                break;
        }
        i++;
        col++;
    }
    //console.log(tplTokenArray);
    return tplTokenArray;
}
var Node_Path = require("path");
function getDeps(tokenArray){
    var namespace = "";
    var templateName = "";
    var deps = [];
    for(var i= 0,l=tokenArray.length;i<l;i++){
        var item = tokenArray[i];
        if(item.name == "namespace"){
            namespace = item.pops.namespace;
            break;
        }
    }
    for(var i= 0,l=tokenArray.length;i<l;i++){
        var item = tokenArray[i];
        if(item.name == "call"){
            var tplPath = item.pops.tplPath;
            if(tplPath.indexOf(".")==0){
                tplPath =namespace+tplPath;
            }
            deps.push(tplPath);
        }else if(item.name == "template"){
            templateName = item.pops.tplName;
        }
    }
    return {namespace:namespace,tplName:templateName,deps:deps};
}

function getTplDeps(sourceText){
    var deps = parseTemplate(sourceText);
    deps = getDeps(deps);
    return deps;
}
module.exports.getTplDeps = getTplDeps;
var fs = require("fs");
function test(){
    var content = fs.readFileSync("./test/data/soy/test.soy",{encoding:"utf8"});
    console.log(JSON.stringify(getTplDeps(content)));
}

//test();



