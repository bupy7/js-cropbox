module.exports = function(grunt) {
    grunt.initConfig({
        eslint: {
            options: {
                configFile: '.eslintrc.js'
            },
            target: ['src/js/*.js']
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-cssnano');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.registerTask('default', ['eslint', 'uglify', 'cssnano']);
};
