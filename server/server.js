const express = require('express')
const ReactSSR = require('react-dom/server')
const path = require('path')
const fs = require('fs');

const app = express();
const isDev = process.env.NODE_ENV === "development"

console.log(isDev)

if(!isDev){
  const template = fs.readFileSync(path.join(__dirname,"../dist/index.html"),'utf8')
  app.use('/public',express.static(path.join(__dirname,"../dist")));//public路径时，返回静态文件
  app.get("*", function(req, res){
    const appString = ReactSSR.renderToString(serverEntry)
    //res.send(appString)
    res.send(template.replace("<!-- app -->",appString))
  })
} else {
  const devStatic = require('./utils/dev-static');
  devStatic(app)
}





app.listen(3333,function(){
  console.log('server is listening at 3333')
})
