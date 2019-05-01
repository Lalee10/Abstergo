import React, { Component } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import "./App.css"
import Dashboard from "./components/General/Dashboard"

class App extends Component {
	render() {
		return (
			<Router className='App'>
				<Dashboard />
			</Router>
		)
	}
}

export default App
