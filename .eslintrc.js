module.exports = {
    extends: 'standard',
    plugins: [
        'standard',
        'promise'
    ],
    rules: {
        indent: ['error', 4],
        'one-var': 0,
        semi: ['error', 'always'],
        'linebreak-style': ['error', 'unix'],
        'space-before-function-paren': ['error', 'never']
    },
    globals: {
        'getComputedStyle': true,
        'CustomEvent': true
    }
};