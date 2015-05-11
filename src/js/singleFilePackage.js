/**
 * 简单的单文件压缩模式
 */
var util = require("../util");
var transCommonJSContentRead = require("./transCommonJS").transCommonJSContentRead;
var transCommonJSContentWrite = require("./transCommonJS").transCommonJSContentWrite;
var requirejs = require('requirejs');

var extend = require("./../util.js").extend;
var fs = require("fs");
var Node_PATH = require("path");



var STATIC_ROOT_PATH;


var trimDefine = require("./compiler").trimDefine;


function singleFilePackage(){
    this._init.apply(this,arguments);
}

singleFilePackage.prototype = {
    _init:function(options){
        var that = this;
        this._options = util.extend({
            mainConfigFile:null,
            baseUrl:"./",
            source:"",
            output:"./build/min.js",
            /**
             * 数值分为三种类型
             *  false 不添加loader 文件
             *  true 添加loader
             */
            isAddSimpleRequire:false
        },options);
        var fsStats = fs.statSync(this._options.output);
        if(fsStats.isDirectory()){
            this._options.output = this._options.output+Node_PATH.sep+this._options.source;
        }
        this.namespacePrefix = "xnCompiler"+parseInt(100+parseInt(Math.random()*10000000));
        this.concatDepsFile(this._options.source,this._options.baseUrl,this._options.rjsOptions,function(content){
            //进行uglify2 压缩
            //console.log(content);
            if(options.__xnCallBack){
                options.__xnCallBack(content);
            }
        });
    },
    /**
     *  使用r.js 读取依赖分析，返回依赖的js 文件
     * @param jsFile
     * @param rootPath
     * @returns depsArray {Array}
     */
    concatDepsFile:function(jsFile,rootPath,rjsOptions,successCallBack,errorCallBack){
        var that = this;
        var rootPath = STATIC_ROOT_PATH = rootPath?rootPath:"static/";
        var outputDirName = Node_PATH.dirname(this._options.output);
        var startFile=outputDirName+"/tmpStart.js";
        var endFile = outputDirName+"/tmpEnd.js";
        //fs.writeFileSync(endFile,"})();",{encoding:"utf8"});
        util.writeFile(endFile,"})();");
        fs.writeFile(startFile,"(function(){if(typeof "+that.namespacePrefix+" == 'undefined'){var "+that.namespacePrefix+"={},"+that.namespacePrefix+"_cache={},"+that.namespacePrefix+"_g=(typeof window=='undefined'?global:window);}",null,function(){
            var config = extend({
                baseUrl:rootPath,
                logLevel:4,
                mainConfigFile: that._options.mainConfigFile,
                out:that._options.output,
                //判断入口js 文件，是require 就用require,是define 就用define 进行合并
                name:jsFile.replace(/\.js$/,""),
                //include:[jsFile],//devConf.modulePath+"/js/index.js",
                wrap:{
                    startFile:startFile,
                    endFile:endFile
                },
                optimize  : 'none',
                onBuildRead : function(moduleName, path, contents){
                    return transCommonJSContentRead(contents,that.namespacePrefix,moduleName,path);
                },
                onBuildWrite: function (moduleName, path, contents) {
                    return transCommonJSContentWrite(contents,that.namespacePrefix,moduleName,path);
                }
            },rjsOptions);

            requirejs.optimize(config, function (buildResponse) {
                //buildResponse is just a text output of the modules
                //included. Load the built file for the contents.
                //Use config.out to get the optimized file contents.
                var contents = fs.readFileSync(config.out, 'utf8');
                contents = trimDefine(config.out,contents);
                fs.writeFileSync(config.out,contents.replace(/\;{1,}$/gi,";").replace(/(\r|\n|\r\n)\;(\r|\n|\r\n)*$/gi,""));
                //console.log(contents);
                if(successCallBack){
                    successCallBack(contents);
                }
                //console.log(contents);
                fs.unlinkSync(startFile);
                fs.unlinkSync(endFile)
            }, function(err) {
                fs.unlinkSync(startFile);
                fs.unlinkSync(endFile)
                //optimization err callback
                if(errorCallBack){
                    errorCallBack(err);
                }else{
                    console.error(err);
                }
            });
        });
    }
}

module.exports.singleFilePackage = singleFilePackage;