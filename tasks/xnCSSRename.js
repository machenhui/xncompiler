'use strict';
var cssRename = require("../src/css/rename");
module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('xnCSSRename', '翻译CommonJS 到普通形式，并输出依赖分析表', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var done = this.async();
        if(this.data){
            this.data.__xnCallBack = function(data){
                done();
            }
        }
        new cssRename(this.data);
    });

};
