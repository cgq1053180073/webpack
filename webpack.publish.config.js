var path = require("path") ;
var webpack=require("webpack") ;

// 抽取css的第三方插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 自动生成index.html页面插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 删除文件夹
var CleanPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
        app:path.resolve(__dirname,'src/js/app.js'),
        vendors:["react","react-dom"]
    },                                                      
	output:{
		path : path.resolve(__dirname,"dist"),             // 输出的位置
		filename: "bundle.js"                              // 输出文件的名字
	} ,
	module: {
    loaders: [ 
        {
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            loader: 'babel',// 加载模块 "babel" 是 "babel-loader" 的缩写
            query: {
                presets: ['es2015', 'react']
            }
        },
        {
 	        test: /\.css$/, // 哈哈
	        loader: 'style!css' // ! 连接多个加载器 从左到右去执行
        },
        {
            test: /\.less$/,
            loader: 'style!css!less' // 处理less文件
        },
        {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=25000&name=images/[name].[ext]' //处理图片文件 1kb = 1024b ~3kb
        },
        {
            test: /\.woff$/,
            loader: 'url?limit=50000&name=fonts/[name].[ext]' //处理字体的
        }

    ]
  }, 
  plugins:[ 
     // 构建之前先删除dist目录下面的文件夹
     new CleanPlugin(['dist']),
     //分离入口文件的vendors等第三方包
     new webpack.optimize.CommonsChunkPlugin({name:"vendors",filename:"vendors.js"}),
     // 用webpack压缩代码，可以忽略代码中的警告
     new webpack.optimize.UglifyJsPlugin({
         compress: {
             warnings: false
         }
     }),
     // 可以新建多个抽离样式的文件，这样就可以有多个css文件了。
      new ExtractTextPlugin("app.css"),
      // compiling our final assets
      new HtmlWebpackPlugin({
          template: './src/template.html',
          htmlWebpackPlugin: {
              "files": {
                  "css": ["app.css"],
                  "js": ["vendors.js","bundle.js"]
              }
          },
          // 效果不大，情怀至上
          minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
          }
      }),
      // 定义生产环境
      new webpack.DefinePlugin({
          //去掉react中的警告，react会自己判断
          'process.env': {
              NODE_ENV: '"production"'
          }
      })
  ]
}