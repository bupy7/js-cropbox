module.exports = function(grunt) {
    grunt.initConfig({
        eslint: {
            options: {
                configFile: '.eslintrc.js'
            },
            target: ['src/js/*.js', 'tests/**/*.js']
        },
        uglify: {
            build: {
                src: 'src/js/cropbox.js',
                dest: 'build/cropbox.min.js'
            }
        },
        cssnano: {
            dist: {
                files: {
                    'build/cropbox.min.css': 'src/css/cropbox.css'
                }
            }
        },
        mocha: {
            test: {
                src: ['tests/*.html'],
                options: {
                    logErrors: true,
                    log: true,
                    reporter: 'spec'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-cssnano');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('default', ['mocha', 'eslint', 'uglify', 'cssnano']);
};
