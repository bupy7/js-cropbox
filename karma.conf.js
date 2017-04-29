module.exports = function(config) {
    config.set({
        autoWatch: false,
        frameworks: ['mocha'],
        singleRun: true,
        browsers: ['PhantomJS'],
        preprocessors: {
            'tests/fixtures/*.html': ['html2js'],
            'build/*.js': ['coverage']
        },
        logLevel: config.LOG_INFO,
        coverageReporter: {
            dir: 'tests/coverage',
            instrumenter: {
                'build/*.js': ['istanbul']
            },
            reporters: [
                {type: 'html', subdir: 'html'},
                {type: 'lcovonly', subdir: 'lcov'}
            ]
        }
    });
};
