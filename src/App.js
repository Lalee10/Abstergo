import React, { Component } from "react"
import { BrowserRouter, Route, Link } from "react-router-dom"
import "./App.css";
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from "./components/General/Dashboard"
import Student from "./components/Main/Student";

class App extends Component {
	render() {
		return (
			<div>
				<CssBaseline>
					<BrowserRouter>
						<Route path="/" component={Dashboard} exact />
						<Route path="/students" component={Student} exact />
					</BrowserRouter>
				</CssBaseline>
			</div>
			
		)
	}
}

export default App
