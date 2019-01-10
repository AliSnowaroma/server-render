const express = require('express')
const ReactSSR = require('react-dom/server')
const serverEntry = require("../dist/server-entry").default;
const path = require('path')
const fs = require('fs');

const template = fs.readFileSync(path.join(__dirname,"../dist/index.html"),'utf8')

console.log(serverEntry)
const app = express();

app.use('/public',express.static(path.join(__dirname,"../dist")));//public路径时，返回静态文件

app.get("*", function(req, res){
  const appString = ReactSSR.renderToString(serverEntry)
  //res.send(appString)
  res.send(template.replace("<app></app>",appString))
})

app.listen(3333,function(){
  console.log('server is listening at 3333')
})
