var webpack =  require('webpack');
var path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')


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
    //config.plugins = [
      //new BundleAnalyzerPlugin()
      // new HtmlWebpackPlugin({
      //   filename:'google04711c37f558a72c.html', //通过模板生成的文件名
      //   template:path.join(__dirname, '_theme/static/google04711c37f558a72c.html'),//模板路径
      //   inject:false, //是否自动在模板文件添加 自动生成的js文件链接
      //   // title:'这个是WebPack Demo',
      //   // minify:{
      //   //   removeComments:true //是否压缩时 去除注释
      //   // }
      // })
      // new CopyWebpackPlugin(
      //   [{
      //     from: path.join(__dirname, '_theme/static/google04711c37f558a72c.html'),
      //     to: path.join(__dirname, '_site'),
      //   }]
      // )
    //],
    config.resolve.alias = {
      'rax-map': path.join(process.cwd(), 'api'),
      //'libs': path.join(process.cwd(), 'libs'),
      'react-router': 'react-router/umd/ReactRouter'
    };
    // console.log('----->>>:',config);
    return config;
  },
  root: '/rax-map/'
};
