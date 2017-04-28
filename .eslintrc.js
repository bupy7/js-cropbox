module.exports = {
    extends: 'standard',
    rules: {
        indent: ['error', 4],
        'one-var': 0,
        semi: ['error', 'always'],
        'linebreak-style': ['error', 'unix'],
        'space-before-function-paren': ['error', 'never'],
        'no-unused-vars': 0,
        eqeqeq: ['error', 'smart'],
        'no-unused-expressions': 0,
        'chai-friendly/no-unused-expressions': 2
    },
    globals: {
        Cropbox: true,
        expect: true,
        chai: true
    },
    env: {
        mocha: true,
        browser: true
    },
    plugins: [
        'chai-friendly'
    ]
};
