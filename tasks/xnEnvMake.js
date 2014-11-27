'use strict';
var mkEnv = require("../src/devEnv/mkEnv");
module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('xnEnvMake', '环境初始化', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var done = this.async();
        if(this.data){
            this.data.__xnCallBack = function(data){
                console.log(data);
                done();
            }
        }
        new mkEnv(this.data);
    });

};
