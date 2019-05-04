import React, { Component } from "react"
import { BrowserRouter, Route, Link } from "react-router-dom"
import "./App.css";
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from "./components/General/Dashboard"
import Student from "./components/Main/Student";
import StudentList from "./components/Main/StudentCRUD/StudentList";
import StudentView from "./components/Main/StudentCRUD/StudentView";
import VideoUpload from "./components/Main/Videos/Upload";
import VideoList from "./components/Main/Videos/List"
import VideoView from "./components/Main/Videos/View"

class App extends Component {
	render() {
		return (
			<div>
				<CssBaseline>
					<BrowserRouter>
						<Route path="/" component={Dashboard} exact />
						<Route path="/students" component={Student} exact />
						<Route path="/students/view" component={StudentList} exact />
						<Route path="/students/:id" component={StudentView} exact />
						<Route path = "/videos/upload" component={VideoUpload} exact />
						<Route path = "/videos" component={VideoList} exact />
						<Route path = "/videos/view" component={VideoView} exact />
					</BrowserRouter>
				</CssBaseline>
			</div>
			
		)
	}
}

export default App
