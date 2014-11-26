module.exports = function (grunt) {
    grunt.registerTask('default', [
        'jshint',
        'jslint',
        'uglify',
        'copy'
    ]);
};
