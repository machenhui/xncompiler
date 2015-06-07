'use strict';
var transCondition = require("../src/js/conditionTrans");
module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('xnConditionCompile', '根据条件编译生成文件', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var done = this.async();
        new transCondition(this.data,function(){
            console.log("ok");
            done();
        });
    });

};