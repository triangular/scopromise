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
            default: ['src/tri-angular-scopromise.js']
        },

        uglify: {
            options: {
                report: 'gzip',
                sourceMap: true
            },
            my_target: {
                files: {
                    'dist/tri-angular-scopromise.min.js': ['src/tri-angular-scopromise.js']
                }
            }
        },

        copy: {
            main: {
                files: [
                    {src: ['src/tri-angular-scopromise.js'], dest: 'demo/lib/tri-angular-scopromise/tri-angular-scopromise.js'},
                    {src: ['src/tri-angular-scopromise.js'], dest: 'dist/tri-angular-scopromise.js'}
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
