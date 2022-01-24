/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  globals: {
    document: 'readonly',
    navigator: 'readonly',
    window: 'readonly'
  },
  plugins: ['@typescript-eslint', 'import', 'tsdoc'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'tsdoc/syntax': 'warn',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false
      }
    ]
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-extraneous-dependencies': 'off',
        'tsdoc/syntax': 'off'
      }
    },
    {
      files: ['test', '__test__', '*.{spec,test}.ts'],
      env: {
        jest: true
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        'import/no-extraneous-dependencies': 'off',
        'tsdoc/syntax': 'off'
      }
    }
  ]
}

module.exports = config
