'use strict';
var parser = require("../src/template/parser");
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
        new parser(this.data);
    });

};
