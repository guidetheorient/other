const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')


module.exports = {
  devtool: 'source-map', //在js中添加debugger
  devServer: {
    contentBase: '.', //本地服务器加载页面所在目录
    historyApiFallback: true, //不跳转,始终指向index.html
    inline: true, //实时刷新    
  },
  entry: './src/js/main.js',
  output: {
    path: __dirname + "/dist", //输出目录  __dirname当前文件路径
    filename: "js/main_1.js" //输出文件名
  },
  plugins: [
    //win10 暂时不能工作
    // new WebpackNotifierPlugin({
    //   title: 'Webpack 编译成功',
    //   alwaysNotify: true
    // }),

    //提取css
    new ExtractTextPlugin({
      filename: "css/main_1.css",
      disable: false,
      allChunks: true
    }),

    //将当前目录下index.html输出到dist下，但其中img路径不会变化
    new HtmlWebpackPlugin({
      title: "X-MEN",
      template: __dirname + "/index.html",
      filename: "index.html"
    }),

    //压缩图片  相当于各种压缩图片插件的上层封装，默认内置几个插件，还可以通过plugin添加其他
    // Make sure that the plugin is after any plugins that add images
    new ImageminPlugin({
      //default就是false，true代表不运行
      disable: false,
      //png压缩  不同种类压缩插件的参数需要参考插件本身的写法
      pngquant: {
        quality: '40-50'
      },

      //这个插件压缩比大会损坏图片
      // jpegtran:{
      //   arithmetic: '[30,40)', 
      //   progressive: true
      // },
    }),

    //不同大小应用不同压缩比
    new ImageminPlugin({
      maxFileSize: 100000, // Only apply this one to files equal to or under 100kb
      plugins: [
        imageminMozjpeg({
          quality: 50,
          progressive: true
        })
      ]
    }),
    new ImageminPlugin({
      minFileSize: 100000, // Only apply this one to files over 100kb
      plugins: [
        imageminMozjpeg({
          quality: 50,
          progressive: true
        })
      ]
    })
  ],
  module: {
    rules: [
      //对ExtractTextPlugin抽离的css进行处理
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          //css中的url路径不正确，少了dist/css/中的css
          //自定义引用路径
          publicPath: '../'
        })
      }, {
        //对所有以下文件进行处理，更换文件名,打包到dist/img下
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
        use: {
          loader: 'file-loader',
          //对loader的配置
          options: {
            name: 'img/[name]_[sha512:hash:base64:7].[ext]'
          }
        }
      },
      {
      //将html，引入到了main.js中，用html-loader过一下，使file-loader可以处理其中的img        
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      }

      //win10这个loader安装不上
      // {　　　　　　
      //   test: /\.html$/,
      //   use: {
      //     loader: 'html-withimg-loader'
      //   }
      // }
    ]
  }
}