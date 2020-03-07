// eslint-disable-next-line import/no-extraneous-dependencies
const { HotModuleReplacementPlugin } = require('webpack');

const plugins = process.env.NODE_ENV === 'production'
  ? []
  : [new HotModuleReplacementPlugin()];

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins,
  },
};
