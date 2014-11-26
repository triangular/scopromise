/**
 * Copy
 */
module.exports = function(grunt) {

    grunt.config.set('copy', {
        main: {
            files: [
                {src: ['src/tri-angular-scopromise.js'], dest: 'demo/lib/tri-angular-scopromise/tri-angular-scopromise.js'},
                {src: ['src/tri-angular-scopromise.js'], dest: 'dist/tri-angular-scopromise.js'}
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};
