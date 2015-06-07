'use strict';
var parser = require("../src/template/parser");
var fs = require("fs");
var util = require("../src/util");
module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('xnTemplateParser', '转意模板中使用到的css', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var done = this.async();
        if(this.data){
            this.data.__xnCallBack = function(data){
                done();
            }
        }
        if(this.data&&this.data.sourceDir){
            var that = this;
            if(!that.data.outputDir){
                that.data.outputDir = that.data.sourceDir;
            }
            fs.stat(this.data.sourceDir,function(error,stat){
                if(stat.isDirectory()){
                    util.dirWalker(that.data.sourceDir,function(filePath,data){
                        var itemRelativePath = filePath.replace(that.data.sourceDir,"").replace(/\\+/gi,"/");
                        var outputPath = that.data.outputDir+itemRelativePath;
                        if(itemRelativePath.search(/\.soy$/gi)!=-1){
                            new parser(util.extend(that.data,{
                                source:filePath.replace(/\\+/gi,"/"),
                                output:outputPath.replace(/\.soy$/gi,".js")
                            }));
                        }
                    });
                }
            })
        }else{
            new parser(this.data);
        }

    });

};
