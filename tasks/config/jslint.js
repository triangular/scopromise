/**
 * Lint JavaScript files
 */
module.exports = function (grunt) {

    grunt.config.set('jslint', {
        app: {
            src: ['src/*.js'],
            exclude: [],
            directives: {
                predef: ['angular'],
                node: true, // accept global 'use strict' statement
                todo: true,
                vars: true,
                indent: 4,
                nomen: true,
                regexp: true,
                maxlen: 120
            },
            options: {
                edition: 'latest'
            }
        }
    });

    grunt.loadNpmTasks('grunt-jslint');
};
