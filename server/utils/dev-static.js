const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const proxy = require('http-proxy-middleware')
const MemoryFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')
const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get("http://loacalhost:8888/public/index.html")
         .then( res => {
          resolve(res.data)
         })
         .catch(reject)
  }
}



//创建内存对象
const mfs = new MemoryFs()
const serverCompiler = webpack(serverConfig);

serverCompiler.outputFileSystem = mfs()

let serverBundle;

const Module = module.constructor;

//启动监听文件变化
serverCompiler.watch({}, (err,stats) => { //这里err是监听文件时的错误信息 stats是打包时输出的内容
  if(err) throw err;

  //输出错误和警告
  stats.errors.forEach( err => console.log(err))
  stats.warnings.forEach( wran => console.log(wran))

  //获取到文件打包的路径
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )

  //根据打包路径读取内存中的文件
  const bundle = mfs.readFileSync(bundlePath, 'utf-8');//这里读取到的是字符串,指定编码格式后才能读取到内容

  const m = new Module();
  m._compile(bundle, "server-entry.js") //这里生成一个新的模块 一定要指定名称
  serverBundle = m.default

})

module.exports = function(app){

  //将public开头的请求代理到http://localhost:8888
  app.use('/public',proxy({
    target:"http://localhost:8888"
  }))

  app.get("*",function(res, req){
    getTemplate().then( template => {
      const content = ReactDomServer.renderToString(serverBundle);
      res.send(template.replace("<!-- APP -->",content))
    })
  })
}
