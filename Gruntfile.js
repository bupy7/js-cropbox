module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: '**',
                dest: 'build/',
                flatten: true,
                filter: 'isFile'
            }
        },
        eslint: {
            options: {
                configFile: '.eslintrc.js'
            },
            target: [
                'src/js/*.js',
                'tests/**/*.js',
                '!tests/coverage/html/*.js'
            ]
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
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            dev: {},
            ci: {
                reporters: ['progress', 'coverage', 'coveralls']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-cssnano');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy', 'karma:dev', 'eslint', 'uglify', 'cssnano']);
};
