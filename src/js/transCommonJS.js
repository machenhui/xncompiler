/**
 * 负责将commonjs 中的 require define 去除
 *
 */
var requirejs = require('requirejs');

var extend = require("./../util.js").extend;
var util = require("./../util.js");
var dirWalker = require("./../util.js").dirWalker;
var fs = require("fs");
var Node_PATH = require("path");

var moduleNameSpateStr="_$_";

var STATIC_ROOT_PATH;
/**
 * 根据规则转换模块名称为变量
 * @param moduleName
 * @returns {String}
 */
function getModuleName(moduleName,filePath){
    if(filePath&&moduleName.search(/^\./gi)!=-1){
        //解决相对路径
        filePath = filePath.replace(/\w*\.js$/gi,"");
        var path = Node_PATH.resolve(filePath,moduleName);
        var rootPATH = Node_PATH.resolve("./"+STATIC_ROOT_PATH);
        if(rootPATH&&path){
            moduleName = path.replace(rootPATH,"").replace(/\\/gi,"/").replace(/^\//gi,"");
            //console.log(moduleName.replace(/\.js$/gi,""));
        }
    }
	return moduleName.replace(/\.js$/gi,"").replace(/\//gi,moduleNameSpateStr);
}
var moduleNameShotName = {};
var index=0;
exports.getModulePath = function(namespace,moduleName,filePath){
    moduleName = moduleName.replace(/\.js$/gi,"");
    var key = moduleNameSpateStr+getModuleName(moduleName,filePath);
    if(!moduleNameShotName[key]){
        moduleNameShotName[key] = "a"+(index++);
    }
    return moduleNameShotName[key];
    //return moduleName;
};

var transRequire = require("./transAMDContent").transRequire;
var transDefine = require("./transAMDContent").transDefine;
var transCallBackReq = require("./transCMDRequire").transCallBack;
var transCMDRequire = require("./transCMDRequire");
var transAMDContent = require("./transAMDContent");
transCMDRequire.setGetModulePath(exports.getModulePath);
transAMDContent.setGetModulePath(exports.getModulePath);
var trimDefine = require("./compiler").trimDefine;



function transCommonJSRead(contents,namespacePrefix,moduleName,path,options){
    var isRequire = contents.search(/require\s*\(\s*\[(.|\r\n)*\],\s*function\s*\(/gi)!=-1;
    var content = transCallBackReq(namespacePrefix,contents,isRequire?null:moduleName,path,options);
    return content;
}


function transCommonJSWrite(contents,namespacePrefix,moduleName,path){
    var isRequire = contents.search(/require\s*\(\s*\[(.|\r\n)*\],\s*function\s*\(/gi)!=-1;
    if(isRequire){
        return transRequire(namespacePrefix,moduleName,contents,path);
    }else{
        return transDefine(namespacePrefix,moduleName,contents,path);
    }
}

exports.transCommonJSContentRead = transCommonJSRead;
exports.transCommonJSContentWrite = transCommonJSWrite;




//过滤目录，生成依赖分析表
function transDirCommonJS(){
    this._init.apply(this,arguments);
}

transDirCommonJS.prototype = {
    _init:function(options){
        this.source = options.source;
        this.output = options.output;
        this.relationMapOutput = options.relationMapOutput;
        this.namespacePrefix = options.namespacePrefix;
        this.baseUrl = options.baseUrl;
        this.callBackFn = options.__xnCallBack;
        this.transDir();
    },
    transDir:function(){
        var that = this;
        that.fileStatsMap = {};
        var length = 0,index =0;
        dirWalker(this.baseUrl+Node_PATH.sep+this.source,function(filePath,fileData){
            filePath = filePath.replace(that.baseUrl+Node_PATH.sep,"").replace(/\\/gi,"/").replace(/\/{1,}/gi,"/");
            length++;
            var moduleName = filePath.replace(/\.js$/gi,"");
            if(!that.fileStatsMap[moduleName]){
                var isRequire = fileData.search(/require\s*\(\s*\[(.|\r\n)*\],\s*function\s*\(/gi)!=-1;
                var rs = transCallBackReq(that.namespacePrefix,fileData,isRequire?null:moduleName,filePath,{
                    returnDeps:true
                });
                rs.deps = that._resolveDeps(moduleName,rs.deps);
                that.fileStatsMap[moduleName] = {modulename:moduleName,deps:rs.deps,rsString:rs.rsString};
            }else{
                console.log(that.fileStatsMap[moduleName]);
            }
        })
        if(this.callBackFn){
            this.callBackFn(that.fileStatsMap);
        }
    },
    _resolveDeps:function(moduleName,deps){
        var rs = [];
        for(var i = 0,l= deps.length;i<l;i++){
            var item = deps[i];
            if(item&&item.length>0){
                var path = Node_PATH.resolve(Node_PATH.dirname(this.baseUrl+Node_PATH.sep+moduleName),item);
                path = Node_PATH.relative(this.baseUrl,path);
                rs.push(path.replace(/\\{1,}/gi,"/"));
            }
        }
        return rs;
    }
}

exports.transDirCommonJS = transDirCommonJS;
/*exports.xncompiler = function(){
    return xnParser;
};*/
