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
    var key = moduleNameSpateStr+getModuleName(moduleName,filePath);
    if(!moduleNameShotName[key]){
        moduleNameShotName[key] = "a"+(index++);
    }
    return moduleNameShotName[key];
    //return key;
};

var transRequire = require("./transAMDContent").transRequire;
var transDefine = require("./transAMDContent").transDefine;
var transCallBackReq = require("./transCMDRequire").transCallBack;
var trimDefine = require("./compiler").trimDefine;


/**
 * 处理Require 关键字 返回转换之后的源码
 * @param namespace
 * @param content
 * @returns code {String}
 */
function rRequire(namespace,content){
	
	return code;
}
/**
 * 处理Define 关键字 返回转换之后的源码
 * @param namespace
 * @param content
 * @returns code {String}
 */
function rDefine(namespace,content){
	return code;
}

function xnParser(){
	this._init.apply(this,arguments);
}

xnParser.prototype = {
		/**
		 * 初始化方法
		 * @param js {String} 指定入口js 文件
         * @param root {String} 指定requirejs 根路径
		 * @param options 其他的一些配置文件
		 */
		_init:function(js,root,options){
			this.rootPath = root;
            this.mainJS = js;
            this._options = extend({
                    namespacePrefix:"xnCompiler"+parseInt(100+parseInt(Math.random()*10000000)),
					rjsOptions:{},
					uglifyOptions:{},
                    _fileStatsMap:{}
				},options);
            this.concatDepsFile(this.mainJS,this.rootPath,this._options.rjsOptions,function(content){
                //进行uglify2 压缩
            })
		},
        _resolveDeps:function(moduleName,deps){
            var rs = [];
            for(var i = 0,l= deps.length;i<l;i++){
                var item = deps[i];
                if(item&&item.length>0){
                    var path = Node_PATH.resolve(Node_PATH.dirname(this.rootPath+Node_PATH.sep+moduleName),item);
                    path = Node_PATH.relative(this.rootPath,path);
                    rs.push(path.replace(/\\{1,}/gi,"/"));
                }
            }
            return rs;
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
            var startFile="build/tmpStart.js";
            var endFile = "build/tmpEnd.js";
            fs.writeFile(startFile,"(function(){if(typeof "+that._options.namespacePrefix+" == 'undefined'){var "+that._options.namespacePrefix+"={},"+that._options.namespacePrefix+"_cache={},"+that._options.namespacePrefix+"_g=(typeof window=='undefined'?global:window);}",null,function(){
                var config = extend({
                    baseUrl:rootPath,
                    logLevel:4,
                    mainConfigFile: rootPath+"/require.config.js",
                    out:"build/"+jsFile,
                    //判断入口js 文件，是require 就用require,是define 就用define 进行合并
                    name:jsFile.replace(/\.js$/,""),
                    //include:[jsFile],//devConf.modulePath+"/js/index.js",
                    wrap:{
                        startFile:startFile,
                        endFile:endFile
                    },
                    optimize  : 'none',
                    onBuildRead : function(moduleName, path, contents){
                        if(that._options.fileStatsMap[path]){
                            return that._options.fileStatsMap[path].rsString;
                        }
                        var isRequire = contents.search(/require\s*\(\s*\[(.|\r\n)*\],\s*function\s*\(/gi)!=-1;
                        var rs = transCallBackReq(that._options.namespacePrefix,contents,isRequire?null:moduleName,path,{
                            returnDeps:true
                        });
                        rs.deps = that._resolveDeps(moduleName,rs.deps);
                        that._options.fileStatsMap[path]={modulename:moduleName,deps:rs.deps,rsString:rs.rsString};
                        return rs.rsString;
                    },
                    onBuildWrite: function (moduleName, path, contents) {
                        //console.log(moduleName.replace("//","/"),this.include[0].replace("//","/"));
                        var isRequire = contents.search(/require\s*\(\s*\[(.|\r\n)*\],\s*function\s*\(/gi)!=-1;
                        //if(this.include[1] && moduleName.replace("//","/") == this.include[1].replace("//","/")){
                        var data;
                        if(isRequire){
                            data = transRequire(that._options.namespacePrefix,contents,path);
                        }else{
                            data = transDefine(that._options.namespacePrefix,moduleName,contents,path);
                        }
                        //util.writeFile(that.output+Node_PATH.sep+path,data);

                        return data;
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
                    if(that._options.compileReady){
                        that._options.compileReady();
                    }
                    //console.log(contents);
                }, function(err) {
                    //optimization err callback
                    if(errorCallBack){
                        errorCallBack(err);
                    }else{
                        console.error(err);
                    }
                });
            });

		}
};

function transCommonJSRead(contents,namespacePrefix,moduleName,path){
    var isRequire = contents.search(/require\s*\(\s*\[(.|\r\n)*\],\s*function\s*\(/gi)!=-1;
    var content = transCallBackReq(namespacePrefix,contents,isRequire?null:moduleName,path);
    return content;
}

function transCommonJSWrite(contents,namespacePrefix,moduleName,path){
    var isRequire = contents.search(/require\s*\(\s*\[(.|\r\n)*\],\s*function\s*\(/gi)!=-1;
    if(isRequire){
        return transRequire(namespacePrefix,contents,path);
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
        this.transDir();
    },
    transDir:function(){
        var that = this;
        that.fileStatsMap = {};
        var length = 0,index =0;
        dirWalker(this.baseUrl+Node_PATH.sep+this.source,function(filePath,fileData){
            filePath = filePath.replace(that.baseUrl+Node_PATH.sep,"").replace(/\\/gi,"/").replace(/\/{1,}/gi,"/");
            length++;
            if(!that.fileStatsMap[filePath]){
                var xnCompiler = new xnParser(filePath,that.baseUrl,{
                    namespacePrefix:that.namespacePrefix,
                    fileStatsMap :that.fileStatsMap,
                    compileReady:function(){
                        index++;
                        if(index == length&&length>0){
                            console.log(that.fileStatsMap);
                        }
                    }
                });
            }else{
                console.log(that.fileStatsMap[filePath]);
            }
        })
    }
}

exports.transDirCommonJS = transDirCommonJS;
exports.xncompiler = function(){
    return xnParser;
};
