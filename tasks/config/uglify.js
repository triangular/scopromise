/**
 * Uglify
 */
module.exports = function(grunt) {

    grunt.config.set('uglify', {
        options: {
            report: 'min',
            sourceMap: true,
            sourceMapName: 'dist/tri-angular-scopromise.min.js.map',
            preserveComments: 'some'
        },
        my_target: {
            files: {
                'dist/tri-angular-scopromise.min.js': ['src/tri-angular-scopromise.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};
