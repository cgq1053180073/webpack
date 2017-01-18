var path = require("path") ;

var OpenBrowserPlugin = require("open-browser-webpack-plugin") ; //自动打开浏览器插件

module.exports = {
	entry:[  //入口文件 
        'webpack/hot/dev-server', //自动转换app.js文件到dist目录下
        'webpack-dev-server/client?http://localhost:8080', //有内容变化自动刷新浏览器
        path.resolve(__dirname,'src/js/app.js') // 监视app.js文件有内容变化就转换到dis目录下
    ],                                                      
	output:{
		path : path.resolve(__dirname,"dist"),             // 输出的位置
		filename: "bundle.js"                              // 输出文件的名字
	} ,
    eslint: {
        configFile: '.eslintrc.js'
    },
	module: {
    preLoaders: [
        { test: /\.js$/, loader: "eslint-loader", exclude: "./node_modules/" }
    ],
    loaders: [ 
        {
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            loader: 'babel',// 加载模块 "babel" 是 "babel-loader" 的缩写
        },
        {
 	        test: /\.css$/, 
	        loader: 'style!css' // ! 连接多个加载器 从左到右去执行
        },
        {
            test: /\.less$/,
            loader: 'style!css!less' // 处理less文件
        },
        {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=25000' //处理图片文件 1kb = 1024b ~3kb
        },
        {
            test: /\.woff$/,
            loader: 'url?limit=100000' // 处理字体的
        }

    ]
   },
   plugins: [
        //自动打来浏览器插件
        new OpenBrowserPlugin({url: 'http://localhost:8080/', browser: 'chrome'}) ,
        "transform-object-assign"
    ]
}

