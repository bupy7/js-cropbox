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
                configFile: 'karma.conf.js',
                files: [
                    // depends
                    'build/cropbox.css',
                    'node_modules/chai/chai.js',
                    'tests/lib/chai.js',
                    'tests/lib/chai-equal-image.js',
                    'node_modules/babel-polyfill/browser.js',               
                    'build/cropbox.js',
                    // hooks
                    'tests/hooks/before.js',
                    'tests/hooks/before-each.js',
                    // tests
                    'tests/methods/*.js',
                    'tests/events/*.js',
                    // assets
                    {pattern: 'tests/assets/*.png', watched: false, included: false, served: true, nocache: false},
                    // fixtures
                    'tests/fixtures/body.html'
                ],
                proxies: {
                    '/assets/': '/base/tests/assets/'
                }
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
