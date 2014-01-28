module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                "camelcase": true,
                "curly": true,
                "expr": true,
                "eqeqeq": false,
                "freeze": true,
                "globalstrict": true,
                "globals": {
                    "angular": false
                },
                "immed": true,
                "indent": 4,
                "latedef": true,
                "maxdepth": 2,
                "maxstatements": 12,
                "maxcomplexity": 5,
                "noarg": true,
                "noempty": true,
                "nonew": true,
                "quotmark": true,
                "strict": true,
                "trailing": true,
                "undef": true,
                "unused": true,
                "white": true
            },
            default: ['dev/triangular-scopromise.js']
        },

        uglify: {
            options: {
                report: 'min'
            },
            my_target: {
                files: {
                    'demo/lib/triangular-scopromise/triangular-scopromise.min.js': ['dev/triangular-scopromise.js'],
                    'dist/triangular-scopromise.min.js': ['dev/triangular-scopromise.js']
                }
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, src: ['dev/triangular-scopromise.js'], dest: 'demo/lib/triangular-scopromise/triangular-scopromise.js'},
                    {expand: true, src: ['dev/triangular-scopromise.js'], dest: 'dist/triangular-scopromise.js'}
                ]
            }
        }

    });

    grunt.registerTask('default', [
        'jshint',
        'uglify',
        'copy'
    ]);

};
