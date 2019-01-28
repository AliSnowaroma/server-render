const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  target:"node",
  entry:{
    app: path.join(__dirname,'../client/server.entry.js')
  },

  output:{
    filename: 'server-entry.js',
    path: path.join(__dirname,'../dist'),
    publicPath: '/public/',
    libraryTarget:"commonjs2"  //使用何种规范
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
  }
}

