import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
class App extends Component {
	constructor(props){
        super(props)
	}

	render(){
		return (
			<div>
        <BrowserRouter>
            <Switch>
              <Route render = {() => <div>5555yyjjj</div>} path = "/index"></Route>
              <Route render = {() => <div>5555nn</div>} path = "/pagetest"></Route>

            </Switch>
        </BrowserRouter>
				这里是服务端渲染tt
			</div>
		)
	}
}

export default App
