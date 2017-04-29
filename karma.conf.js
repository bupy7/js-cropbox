module.exports = function(config) {
    config.set({
        autoWatch: false,
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
        },
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
