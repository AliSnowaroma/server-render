const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry:{
		app: path.join(__dirname,'../client/App.js')
	},

	output:{
		filename: '[name].[hash].js',
		path: path.join(__dirname,'../dist'),
		publicPath: '/public',//引用静态资源时添加在文件名字前面的路径
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
