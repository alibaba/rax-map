var webpack =  require('webpack');
var path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
  source: ['./api', './articles', 'CHANGELOG.md'],//引入的md文件路径
  output: './_site',
  entry: {
    index: {
      theme: './_theme',
      htmlTemplate: './_theme/static/template.html'//页面模板
    }
  },
  plugins: [
    'bisheng-plugin-react?lang=__react',
    'bisheng-plugin-antd'
  ],
  port: 9001,//服务启动的端口号
  /**
   * bisheng 对 config 的属性部分支持
   * 如果在npm run site后,有执行错误可以用以下方法:
   * 可以参考 nodemodules 里的配置,设置 build -> webpackConfig.UglifyJsPluginConfig 里的属性
   sourceMap:true,
    output: {
      //ascii_only: true
      beautify:true
    },
    // compress: {
    //   warnings: false
    // }
    compress:false,
    mangle:false
  };
  webpackConfig.devtool='source-map'; // 也可以添加sourceMap
   */
  webpackConfig(config) {
    // config.externals = {
    //   'React': 'react'
    // },
    //config.plugins = [
    //   new webpack.DefinePlugin({
    //     "process.env.NODE_ENV" : (JSON.stringify(process.env.NODE_ENV+'_aaaaa'))
    //  })
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
