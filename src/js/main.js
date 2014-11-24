/**
 * 入口文件，解析参数
 * 解析配置参数
 */
var util = require("../util");
//var compiler = require("./transCommonJS").xncompiler();
var fs = require("fs");


function inputFileMode(sourceFile){
    //判断输入文件是否是目录，还是文件
    var source = sourceFile;
    if(util.type(source) != "String"){
        console.error("source 字段错误,source=",source);
    }
    var fsStat = fs.statSync(source);
    var fileMode = "singleFile";
    if(fsStat.isFile()){
        fileMode = "singleFile";
    }else if(fsStat.isDirectory()){
        fileMode = "directory";
    }else{
        console.error("文件或目录不存在");
        process.exit(-1);
    }

    return fileMode;
}

var defaultOutputDir = "./build/";
var defaultOutputFile = "{FileName}.min.js";

/**
 * 条件编译组件
 */
function conditionCompileInit(options){
    var _options = util.extend({
        //支持目录和单个文件
        source:null,
        //到output 目录下按照对应文件输出
        ouput:null,
        //条件指定文件
        conditionFile:null,
        //全局变量定义
        globalDefineFile:null,
        //是否压缩,默认不压缩
        optimize:"none"
    },options);

}
/**
 * wrapper 翻译commonjs 文件
 */
function transFileInit(options){
    var _options = util.extend({
        source:null,
        output:null,
        //依赖关系输出文件
        relationMapOutput:null,
        //是否压缩,默认不压缩
        optimize:"none"
    },options);
}

function singleFileInit(options){
    var _options = util.extend({
        //指定requirejs 的配置文件
        mainConfigFile:null,
        //指定输出的根路径
        baseUrl:"./",
        //指定入口js 文件，指定的是目录，则在output 目录下输出所有编译过的文件，按目录结构输出，如果是文件，则在ouput/{FileName}.min.all.js
        source:"",
        //指定输出文件目录
        output:"./build/",
        //是否集成simple loader 将require方法内置到压缩文件内部
        isAddSimpleRequire:false
    },options);
}

module.exports = {
    conditionCompileInit:conditionCompileInit,
    transFileInit:transFileInit,
    singleFileInit:singleFileInit
};



