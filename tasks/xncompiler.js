/*
 * grunt-xncompiler
 * https://github.com/machenhui/xncompiler
 *
 * Copyright (c) 2014 machenhui
 * Licensed under the MIT license.
 */

'use strict';
var singleFilePackage = require("../src/js/singleFilePackage").singleFilePackage;
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('xncompiler', 'commonjs 文件合并工具', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var done = this.async();
    if(this.data){
      this.data.__xnCallBack = function(data){
        console.log(data.length);
        done();
      }
    }
    if(this.data.isDebug){
      global.isXNDebug = true;
    }
    new singleFilePackage(this.data);
    // Iterate over all specified file groups.

  });

};
