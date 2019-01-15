const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === "development"


const config = {
	entry:{
		app: path.join(__dirname,'../client/App.js')
	},

	output:{
		filename: '[name].[hash].js',
		path: path.join(__dirname,'../dist'),
		publicPath: '/public/',//引用静态资源时添加在文件名字前面的路径
    //要写成'/public/',后面的/也要加，在hotModuleReplacement时要用到这个路径  hot....update.js会放在pubilc路径后面
	},
  resolve:{
    extensions: ['.js', '.json', '.jsx', '.scss', '.css']
  },
  module:{
    rules:[
      {
        //test:"/\.jsx$/",  不能加引号
        test: /\.jsx$/,
        loader:'babel-loader'
      },
      {
        test:/\.js$/,
        loader: "babel-loader",
        exclude : /node_modules/
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:path.join(__dirname,"../client/template.html")
    })
  ]

}

if(isDev){
  config.entry = {
    //react-hot-loader/patch 一定要写在entry 的最前面，如果有 babel-polyfill 就写在babel-polyfill 的后面
    app:[
      'react-hot-loader/patch',
      path.join(__dirname,'../client/App.js')

    ]
  }
  config.devServer = {
    host: '0.0.0.0', //可以用任意方式访问，指向本机
    port:'8888',
    contentBase: path.join(__dirname,'../dist'),
    hot:true,
    overlay:{  //在浏览器中显示遮罩 提示报错信息， 警告信息等
      errors:true
    },
    publicPath:'/public',
    historyApiFallback: {
      index:"/public/index.html"
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config;
