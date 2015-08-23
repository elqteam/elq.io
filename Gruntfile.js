"use strict";

module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);

    var config = {
        clean: ["dist"],

        less: {
            development: {
                files: {
                    "dist/css/style.css": "src/less/style.less"
                }
            }
        },

        copy: {
            main: {
                files: [
                    { expand: true, cwd: "src/", src: ["*.html"], dest: "dist/" },
                    { expand: true, cwd: "src/", src: ["js/**/*.js"], dest: "dist/" },
                    { expand: true, cwd: "assets/", src: ["**/*.*"], dest: "dist/" },
                    { expand: true, cwd: "bower_components/", src: ["modernizr/modernizr.js"], dest: "dist/js/" },
                    { expand: true, flatten: true, cwd: "node_modules/", src: ["elq/dist/*.js"], dest: "dist/js/elq/" }
                ]
            }
        },

        watch: {
          scripts: {
            files: ['src/**/*.less', 'src/**/*.js', 'src/**/*.html'],
            tasks: ['build'],
            options: {
              spawn: false,
            },
          },
        },

        connect: {
          server: {
            options: {
              port: 8000,
              hostname: '*',
              base: 'dist'
            }
          }
        }
    };

    grunt.initConfig(config);

    grunt.registerTask("build", ["clean", "less:development", "copy:main"]);

    grunt.registerTask("default", ["build", "connect", "watch"]);
};