'use strict';
var transCommonJS = require("../src/js/transCommonJS").transDirCommonJS;
module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('xnTransCommonJS', '翻译CommonJS 到普通形式，并输出依赖分析表', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var done = this.async();
        if(this.data){
            this.data.__xnCallBack = function(data){
                console.log(data.length);
                done();
            }
        }
        new transCommonJS(this.data);
    });

};
