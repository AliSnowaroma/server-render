import React from 'react';
import App from './App.jsx';
import { AppContainer } from 'react-hot-loader'
import ReactDOM from 'react-dom'


const render = Component => {
  ReactDOM.render(
    <AppContainer><Component></Component></AppContainer>,
    document.getElementById('root'))
}

render(App)
console.log(module,'ceshi')
if(module.hot){
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default;
    render(NextApp)
  })
}
