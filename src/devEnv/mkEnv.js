/**
 * Created by machenhui on 2014/11/27.
 */

var util = require("../util");
var fs = require("fs");
var NPath = require("path");
var seedContent = fs.readFileSync(NPath.dirname(module.filename)+"/tpl/seed-t.js");
var moduleNameVar = "$$_moduleName_$$";
var templateParser = require("../template/parser");
var vm = require("vm");
function envInit(){
    this._init.apply(this,arguments);
}

envInit.prototype = {
    _init:function(options){
        this._options = util.extend({
            moduleName:"",//grunt 传入myDev 文件中的moduleName
            staticRoot:"static/"
        },options);
        if(!this._options.moduleName){
            if(this._options.__xnCallBack){
                this._options.__xnCallBack(new Error("moduleName 不能为空"));
            }else{
                console.error("moduleName 不能为空");
                process.exit(-1);
            }
        }
        this._compileFile();
        this._writeDemoHTML();
        this._writeIndexSCSS();
        this._writeMainJS();
        this._writeSeedJS();
    },
    _compileFile:function(){
        this.mainSoyPath = NPath.dirname(module.filename)+"/tpl/mainJS.soy";
        this.mainSoyPath = NPath.relative(".",this.mainSoyPath).replace(/\\+/gi,"/");
        new templateParser({
            source:this.mainSoyPath,
            output:this.mainSoyPath+".js"
        });
        this.indexHTMLSoyPath = NPath.dirname(module.filename)+"/tpl/index.soy";
        new templateParser({
            source:NPath.relative(".",this.indexHTMLSoyPath),
            output:this.indexHTMLSoyPath+".js"
        });
        this.soyutiljs = NPath.dirname(module.filename)+"/tpl/soyutils.js";
        vm.runInThisContext(fs.readFileSync(this.soyutiljs).toString());
    },
    _writeSeedJS: function () {
        var moduleName = this._options.moduleName;
        var seedJSContent = seedContent.toString().replace(moduleNameVar,moduleName);
        util.writeFile(this._options.staticRoot+"/"+moduleName+"/js/seed.js",seedJSContent);
    },
    _writeMainJS:function(){
        var mainPath = this.mainSoyPath;
        var mainJSPath = mainPath+".js";
        var code = fs.readFileSync(mainJSPath);
        vm.runInThisContext(code);
        var indexHTML = tpl.tools.mainJS();
        util.writeFile(this._options.staticRoot+"/"+this._options.moduleName+"/js/main.js",indexHTML);
        fs.unlinkSync(mainJSPath);
    },
    _writeIndexSCSS:function(){
        util.writeFile(this._options.staticRoot+"/"+this._options.moduleName+"/scss/index.scss","");
    },
    /**
     * 生成demo tpl
     * @private
     */
    _writeDemoHTML:function(){
        var mainPath = this.indexHTMLSoyPath;
        var mainJSPath = mainPath+".js";
        var code = fs.readFileSync(mainJSPath);
        vm.runInThisContext(code.toString());
        var indexHTML = tpl.tools.indexHTML({moduleName:this._options.moduleName});
        util.writeFile(this._options.staticRoot+"/"+this._options.moduleName+"/index.html",indexHTML);
        fs.unlinkSync(mainJSPath);
    }
};

module.exports = envInit;

