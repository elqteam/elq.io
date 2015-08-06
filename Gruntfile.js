"use strict";

module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);

    var config = {
        less: {
            development: {
                files: {
                    "dist/style.css": "src/less/style.less"
                }
            }
        }
    };

    grunt.initConfig(config);

    grunt.registerTask("build", "less:development");

    grunt.registerTask("default", "build");
};