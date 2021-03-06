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

        cssmin: {
          target: {
            files: [{
              expand: true,
              cwd: 'dist/css',
              src: ['*.css', '!*.min.css'],
              dest: 'dist/css',
              ext: '.min.css'
            }]
          }
        },

        copy: {
            main: {
                files: [
                    { expand: true, flatten: true, cwd: "src/", src: ["CNAME"], dest: "dist/" },
                    { expand: true, flatten: true, cwd: "src/", src: ["favicon.ico"], dest: "dist/" },
                    { expand: true, cwd: "src/", src: ["*.html"], dest: "dist/" },
                    { expand: true, cwd: "src/", src: ["js/**/*.js"], dest: "dist/" },
                    { expand: true, cwd: "assets/", src: ["**/*.*"], dest: "dist/" },
                    { expand: true, flatten: true, cwd: "node_modules/", src: ["elq/dist/*.js"], dest: "dist/js/elq/" },
                    { expand: true, flatten: true, cwd: "node_modules/", src: ["tabs/*.js"], dest: "dist/js/tabs/" }
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

    grunt.registerTask("build", ["clean", "less:development", "cssmin", "copy:main"]);
    grunt.registerTask("default", ["build", "connect", "watch"]);
};