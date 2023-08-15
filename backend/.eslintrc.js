module.exports = {
  parserOptions: {
    ecmaVersion: 8
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  env: {
    node: true,
    es6: true
  },
  rules: {
    'prettier/prettier': 'warn'
  }
}
