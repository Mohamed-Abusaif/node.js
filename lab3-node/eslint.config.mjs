const antfu = require('@antfu/eslint-config');

module.exports = [
  ...antfu,
  {
    rules: {
      'no-console': 'warn'
    }
  },
  {
    files: ['**/*.ts', '**/*.js'],
    rules: {
      'max-statements-per-line': ['error', { max: 2 }],
      'object-curly-spacing': ['error', 'never'],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }]
    }
  },
  {
    files: ['**/*.ts'],
    rules: {
      'curly': ['error', 'all']
    }
  },
  {
    files: ['**/*.js'],
    rules: {
      'max-statements-per-line': ['error', { max: 2 }],
      'semi': ['error', 'always', { omitLastInOneLineBlock: true }],
      'comma-dangle': ['error', 'never'],
      'operator-linebreak': ['warn', 'before'],
      'arrow-parens': ['warn', 'always'],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'prefer-template': 'warn',
      'antfu/top-level-function': 'off',
      'antfu/if-newline': 'off',
      'test/prefer-lowercase-title': 'off',
      'unused-imports/no-unused-vars': 'warn',
      'curly': 'off'
    }
  }
];
