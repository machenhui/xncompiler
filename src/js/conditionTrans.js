/**
 * 根据条件转意目录或者文件
 */

var UglifyJS = require("uglify-js");
var fs = require("fs");
var path = require("path");

var vm = require("vm");
var util = require("../util");


/*function mkdirSync(url,mode,cb){
    var  arr = url.split("/");
    mode = mode || 0755;
    cb = cb || function(){};
    if(arr[0]==="."){//处理 ./aaa
        arr.shift();
    }
    if(arr[0] == ".."){//处理 ../ddd/d
        arr.splice(0,2,arr[0]+"/"+arr[1])
    }
    function inner(cur){
        if(!fs.existsSync(cur)){//不存在就创建一个
            fs.mkdirSync(cur, mode)
        }
        if(arr.length){
            inner(cur + "/"+arr.shift());
        }else{
            cb();
        }
    }
    arr.length && inner(arr.shift());
}

function writeFile(_path,content){
    //测试代码
    mkdirSync(path.dirname(_path),0,function(e){
        if(e){
            console.log('出错了');
        }else{
            fs.writeFileSync(_path, content);
        }
    });
}*/

var writeFile = util.writeFile;



function getGlobalConditionValue(values,name,_path){
    var value ;
    for(var i= 0,ll=values.length;i<ll;i++){
        value = values[i][name];
        for (var l = _path.length; l--;) {
            if (value[_path[l]] == null) {
                value = null;
                break;
            } else {
                value = value[_path[l]];
            }
        }
        if(value){
            break;
        }
    }
    return value;
}



function conditionTrans(){
    this._init.apply(this,arguments);
}

conditionTrans.prototype = {
    _init:function(options){
        this.conditionFile = options.conditionFile;
        this.globalDefineFile = options.globalDefineFile;
        this.source = options.source;
        this.output = options.output;
        this.optimize = options.optimize?options.optimize:true;
        this.initConditionFile();
        var that = this;
        this._getSourceFiles(this.source,this.output,function(filePath,outputDir,fileData){
            that.transFileData(filePath,outputDir,fileData);
        })
    },
    /**
     * 扫描目录，遇到文件后，进行条件编译，之后将文件输出到指定目录
     * @param inputDir
     * @param outputDir
     * @param callBackFn
     * @private
     */
    _getSourceFiles:function(inputDir,outputDir,callBackFn){
        var stat = fs.statSync(inputDir);
        var that = this;
        if(stat.isFile()){
            fs.readFile(inputDir,{encoding:"utf8"}, function (err, data) {
                if (err){
                    throw err;
                    process.exit(-1);
                }
                if(callBackFn){
                    callBackFn(inputDir,outputDir,data);
                }
            });
        }else if(stat.isDirectory()){
             fs.readdir(inputDir,function(err,files){
                if(err){
                    throw err;
                    process.exit(-1);
                }
                files.forEach(function(item){
                    that._getSourceFiles(inputDir+path.sep+item,outputDir,callBackFn);
                })
            })
        }
    },
    transFileData:function(inputPath,outputDir,fileData){
        var that = this;
        var topLevelAST = null;
        topLevelAST = UglifyJS.parse(fileData.toString(), {
            fileName: inputPath,
            toplevel: topLevelAST
        });

        function findClouda(ast_dot, _path) {
            if (!_path) {
                _path = [];
            }
            if (ast_dot instanceof UglifyJS.AST_Dot) {
                if (ast_dot.expression) {
                    _path.push(ast_dot.property);
                    return findClouda(ast_dot.expression, _path);
                }else{
                    console.log(ast_dot);
                }
            } else {
                if ((ast_dot instanceof UglifyJS.AST_SymbolRef) && ast_dot.global() && ast_dot.undeclared()) {
                    var global_def = that._globalDefAST.find_variable(ast_dot.name);
                    if(!global_def){
                        global_def = that._globalConditionAST.find_variable(ast_dot.name);
                    }
                    if (global_def) {
                        //console.log([that._globalConditions,that._globalDefs],ast_dot.name,_path);
                        return getGlobalConditionValue([that._globalConditions,that._globalDefs],ast_dot.name,_path);
                        /*var value = that._globalDefs[ast_dot.name];
                        for (var l = _path.length; l--;) {
                            if (value[_path[l]] == null) {
                                //console.error("获取的参数不存在",ast_dot.name,value,_path[l],_path.reverse());
                                return;
                            } else {
                                value = value[_path[l]];
                            }
                        }
                        return value;*/
                    }

                }

            }
        }

        topLevelAST.figure_out_scope();
        var deep_clone = new UglifyJS.TreeTransformer(function (node, descend) {
            //console.log("\t", node.TYPE);
            switch (node.TYPE) {
                case "VarDef":
                    //console.log(node.name.name);
                    break;
                case "SymbolVar":
                    //console.log(node.name);
                    break;
                case "ObjectKeyVal":
                    //console.log(node.key);
                    break;
                case "SymbolRef":
                    //console.log(node.name, node.TYPE);
                    break;
                case "Dot":
                    //console.log(node.property, node.TYPE);
                    var parent = deep_clone.parent();
                    var rs = findClouda(node);
                    if (rs != null && parent instanceof UglifyJS.AST_Assign) {
                        console.error("代码中不能对常量进行定义", node);
                        process.exit(-1);
                    } else if (rs != null) {
                        return new UglifyJS.AST_Number({
                            value: rs,
                            start: node.start,
                            end: node.end
                        });
                    }
                    break;
                case "If":
                    //console.log(node);
                    break;
                default:
                    //console.log(node.TYPE);
                    break;
            }
            descend(node, this);
            return node;
        });
        var transTree = topLevelAST.transform(deep_clone);
        //var content = transTree.print_to_string({beautify: true});
        var compressor1 = UglifyJS.Compressor({
            warnings: false,
            if_return: true,
            unsafe: true,
            unsafe_comps: true
            //beautify:false
        });
        //命名混淆
        if(this.optimize&&this.optimize!="none"){
            transTree.mangle_names(true);
        }
        var compressed_ast2 = transTree.transform(compressor1);
        var beautify = true;
        if(this.optimize&&this.optimize!="none"){
            beautify = false;
        }
        var content = compressed_ast2.print_to_string({beautify: beautify});
        var newLength = content.length;
        //fs.writeFileSync(outputDir+path.sep+inputPath.replace(/\.js$/gi, "-dd.js"), content);
        writeFile(outputDir+path.sep+inputPath, content);
    },
    initConditionFile:function(){
        var conditionContent = fs.readFileSync(this.conditionFile,{encoding:"utf8"});
        var globalDefineContent = fs.readFileSync(this.globalDefineFile,{encoding:"utf8"});
        if(!conditionContent||!globalDefineContent){
            throw new Error("文件读取失败",this.conditionFile,this.globalDefineFile);
            process.exit(-1);
        }
        var globalConditionAST = null;
        globalConditionAST = UglifyJS.parse(conditionContent.toString(),{
            fileName:this.conditionFile,
            toplevel:globalConditionAST
        });
        globalConditionAST.figure_out_scope();
        this._globalConditionAST = globalConditionAST;
        var globalConditions = vm.createContext({});
        vm.runInContext(conditionContent, globalConditions, this.conditionFile);
        this._globalConditions = globalConditions;
        var globalDefAST = null;
        globalDefAST = UglifyJS.parse(globalDefineContent.toString(),{
            fileName:this.globalDefineFile,
            toplevel:globalDefAST
        });
        globalDefAST.figure_out_scope();

        var globalDefs = vm.createContext({});
        vm.runInContext(globalDefineContent, globalDefs, this.globalDefineFile);
        this._globalDefs = globalDefs;
        this._globalDefAST = globalDefAST;
    }
}

module.exports = conditionTrans;