import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dashboard from "./components/General/Dashboard";
import Student from "./components/Main/Student";
import StudentForm from "./components/Forms/StudentForm";
import TeacherForm from "./components/Forms/TeacherForm";
import TestForm from "./components/Forms/TestForm";
import UserForm from "./components/Forms/UserForm";
import { toast } from "react-toastify";

toast.configure({
	position: toast.POSITION.TOP_RIGHT,
	autoClose: 3000,
});

class App extends Component {
	render() {
		return (
			<div>
				<CssBaseline>
					<BrowserRouter>
						<Route path="/" component={Dashboard} exact />
						<Route path="/students" component={Student} exact />
						<Route path="/students/form" component={StudentForm} exact />
						<Route path="/teachers/form" component={TeacherForm} exact />
						<Route path="/tests/form" component={TestForm} exact />
						<Route path="/users/form" component={UserForm} exact />
					</BrowserRouter>
				</CssBaseline>
			</div>
		);
	}
}

export default App;
