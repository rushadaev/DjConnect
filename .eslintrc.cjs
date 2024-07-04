module.exports = {
    root: true,
    env: {
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['@typescript-eslint'],
    ignorePatterns: ['dist'],
    rules: {
        'vue/html-indent': ['error', 'tab', {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        }],
        'vue/attributes-order': ['error', {
            'order': [
                'DEFINITION',
                'CONDITIONALS',
                'LIST_RENDERING',
                'RENDER_MODIFIERS',
                'GLOBAL',
                ['UNIQUE', 'SLOT'],
                'TWO_WAY_BINDING',
                'OTHER_DIRECTIVES',
                'OTHER_ATTR',
                'EVENTS',
                'CONTENT'
            ],
            'alphabetical': false
        }],
        'object-curly-spacing': ['error', 'always'],
        'quotes': ['error', 'single'],
        'no-trailing-spaces': 'error',
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
        'semi': ['error', 'never']
    }
}