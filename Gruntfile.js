/*
 * grunt-xncompiler
 * https://github.com/machenhui/xncompiler
 *
 * Copyright (c) 2014 machenhui
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    xncompiler: {
      test:{
        baseUrl:"test/blendUI/",
        source:"src/web/main.js",
        mainConfigFile:"test/blendUI/require.config.js",
        output:"./build/"
      }
    },
    xnConditionCompile:{
      test:{
        source:"./test/runtime-API/runtime-API/src/device/",
        output:"./build/",
        conditionFile:"./test/data/condition.js",
        globalDefineFile:"./test/data/defineVar.js"
        //optimize:"none"
      }
    },
    xnTransCommonJS:{
      test:{
        baseUrl:"test/blendUI/",
        source:"src/web/",
        mainConfigFile:"test/blendUI/require.config.js",
        output:"./build/"
      }
    },
    xnCSSRename:{
      test:{
        src:"test/data/css/index.css",
        mangleNameOutputFile:"build/index.css.map.json",
        output:"./build/test/data/css/index.css",
        cssNamePrefix:"wa-ticket-"
      }
    },
    xnTemplateParser:{
      test:{
        source:"test/data/soy/test.soy",
        output:"./build/test/data/soy/test.js",
        cssRenameMap:"build/index.css.map.json"
      }
    },
    xnEnvMake:{
      test:{
        source:"test/data/soy/test.soy",
        output:"./build/test/data/soy/test.js",
        cssRenameMap:"build/index.css.map.json"
      }
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'xncompiler', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
