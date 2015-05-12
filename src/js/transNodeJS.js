/**
 * Created by machenhui on 2015/5/7.
 * 转化nodejs 模块文件
 * 1.添加 wrapper
 * 2.调用 transCMDRequirejs
 * 3.兼容类似fis的需求
 */
var transCommonJS = require("./transCommonJS");
var util = require("../util");
var namespace ="xnNodeJS";
var fs = require("fs");
var path = require("path");

function wrapper(content){
    return "define(function(require,exports,module){"+content+"})";
}
var globalMap = {};
function transNodeJS(options){
    var _options = util.extend({
        baseDir:null,
        sourceFile:"",
        tmpDir:"./build/xnBuildTmp/",
        successFn:function(data){}
    },options);
    var filePath;
    if(_options.baseDir){
        filePath = _options.baseDir+path.sep+_options.sourceFile;
    }else{
        filePath = _options.sourceFile;
    }
    var content = fs.readFileSync(filePath);
    //var moduleName = path.basename(_options.sourceFile,".js");
    //var moduleName = path.resolve(_options.baseDir,_options.sourceFile);
    moduleName = _options.sourceFile.replace(/\\{1,}/gi,"/").replace(/\.js$/gi,"");
    //console.log(moduleName);
    var rs = transCommonJS.transCommonJSContentRead(wrapper(content.toString()),namespace,moduleName,filePath,{
        "returnDeps":true
    });
    //console.log("==========",filePath,_options,rs);
    //console.log("deps===",rs.deps);
    var rsArray = [];
    if(!globalMap[filePath]){
        rsArray.push(rs.rsString);
        globalMap[filePath] = rs;
    }
    if(rs.deps){
        var that = this;
        rs.deps.forEach(function(item,index,array){
            //console.log(path.resolve(path.dirname(filePath),item+".js"),filePath,item);
            //if(item.search(/^\.*\//gi)!=-1){
                if(item.search(/\.js/gi) == -1){
                    item+=".js"
                }
                //console.log(filePath,item,path.resolve(path.dirname(filePath),item),index,array.length);
                //console.log("--------------------------------------------");
                //var sourceFilePath = path.relative(_options.baseDir,path.resolve(path.dirname(filePath),item));
                var sourceFilePath = item;
                var _tmpFilePath;
                if(_options.baseDir){
                    _tmpFilePath = _options.baseDir+path.sep+sourceFilePath;
                }else{
                    _tmpFilePath = sourceFilePath;
                }

                if(fs.existsSync(_tmpFilePath)){
                    transNodeJS({
                        baseDir:_options.baseDir,
                        sourceFile:sourceFilePath,
                        tmpDir:_options.tmpDir,
                        writeFile:_options.writeFile,
                        successFn:function(data){
                            rsArray = rsArray.concat(data);
                            //console.log(rsArray.length,index,path.resolve(path.dirname(filePath),item));
                        }
                    })
                }else{
                    console.log("找不到模块,可能使用了nodejs 插件",_tmpFilePath);
                }


            //}
        });
    }
    if(_options.writeFile){
        var fileName = rs.moduleName.search(/\.js$/gi)==-1?rs.moduleName+".js":rs.moduleName;
        util.writeFile(_options.tmpDir+"/"+fileName,rs.rsString);
        //console.log(_options.tmpDir+"/"+fileName,"文件输出完毕");
    }
    if(_options.successFn){
        _options.successFn(rsArray);
        //console.log("---------",rsArray.length,filePath,_options.successFn.toString());
    }else{
        console.log(rsArray);
    }
}


module.exports = transNodeJS;