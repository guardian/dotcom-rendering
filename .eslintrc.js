// @flow
module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: '2017',
    sourceType: 'module',
  },
  extends: [
    'plugin:flowtype/recommended',
    'prettier/flowtype',
    'prettier/react',
  ],
  plugins: ['flow-header', 'flowtype'],
  rules: {
    'flow-header/flow-header': 'error',

    // flow should take care of our return values
    'consistent-return': 'off',
  },
};
