#服务端渲染框架


#hot-module-replacement
`
使用 react-hot-loader
配置步骤：
-
babelrc配置：plugins:['react-hot-loader/babel']
-
app.js配置：
import { AppContainer } from 'react-hot-loader'
render时用AppContainer包裹
判断module.hot
-
webpack配置
entry中加入 react-hot-loader/patch
plugin中使用webpack.HotModuleReplacementPlugin
`

#服务端渲染主要应用react-dom的server模块
`const ReactSSR = require('react-dom/server')`

#服务端使用node的express框架

#开发时打包文件放到内存中，从而加快读取速度
`//使用模块memory-fs
 const MemoryFs = require('memory-fs')
 const mfs = new MemoryFs()
`

#使用http-proxy-middleware把localhost文件代理到server端
