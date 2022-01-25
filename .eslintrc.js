/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: ['@zhengxs/eslint-config-library'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off'
  }
}

module.exports = config
