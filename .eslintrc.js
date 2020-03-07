module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'consistent-return': 0,
    'object-curly-newline': 0,
    'no-await-in-loop': 0,
    'no-restricted-syntax': 0,
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state',
          'acc',
          'e',
          'el',
          'element',
          'vnode',
          'event',
          'res',
          'cacheData',
        ],
      },
    ],
    'space-before-function-paren': [
      'error',
      'always',
    ],
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    'import/prefer-default-export': 0,
    camelcase: 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
