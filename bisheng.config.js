var webpack =  require('webpack');
var path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  source: ['./api', './articles', 'CHANGELOG.md'],
  output: './_site',
  entry: {
    index: {
      theme: './_theme',
      htmlTemplate: './_theme/static/template.html'
    }
  },
  plugins: [
    'bisheng-plugin-react?lang=__react',
    'bisheng-plugin-antd'
  ],
  port: 9001,
  webpackConfig(config) {
    // config.externals = {
    //   'React': 'react'
    // },
    // config.plugins = [
    //   new BundleAnalyzerPlugin()
    // ],
    config.resolve.alias = {
      'rax-map': path.join(process.cwd(), 'api'),
      //'libs': path.join(process.cwd(), 'libs'),
      'react-router': 'react-router/umd/ReactRouter'
    };
    return config;
  },
  root: '/api/'
};
