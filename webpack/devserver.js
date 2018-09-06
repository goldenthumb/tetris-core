const {resolve} = require('path');
const devConfig = require('./dev');
const buildConfig = require('./build');

module.exports = () => {
  const config = {
    ...devConfig,
    devServer: {
      port: 3000,
      host: 'localhost',
      contentBase: resolve(__dirname, '../views'),
      publicPath: '/dist/js'
    }
  };

  config.output.filename = buildConfig.output.filename;

  return config;
};