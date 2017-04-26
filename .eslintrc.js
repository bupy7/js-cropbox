module.exports = {
    extends: 'standard',
    rules: {
        indent: ['error', 4],
        'one-var': 0,
        semi: ['error', 'always'],
        'linebreak-style': ['error', 'unix'],
        'space-before-function-paren': ['error', 'never'],
        'no-unused-vars': 0,
        eqeqeq: ['error', 'smart']
    },
    globals: {
        Cropbox: true,
        expect: true,
        chai: true
    },
    env: {
        mocha: true,
        browser: true
    }
};
