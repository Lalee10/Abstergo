import React, { Component } from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
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
import StudentList from "./components/Main/StudentCRUD/StudentList";
import StudentView from "./components/Main/StudentCRUD/StudentView";
import VideoUpload from "./components/Main/Videos/Upload";
import VideoList from "./components/Main/Videos/List"
import VideoView from "./components/Main/Videos/View"
import TestList from "./components/Main/TestCRUD/TestList";
import TestView from "./components/Main/TestCRUD/TestView";
import Login from "./components/Main/Auth/Login";

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
						<Route path="/login" component={Login} exact />

						<Route path="/students" component={Student} exact />
						<Switch>
							<Route path="/students/view" component={StudentList} exact />
							<Route path="/students/form" component={StudentForm} exact />
							<Route path="/students/:id" component={StudentView} exact />
							
						</Switch>

						<Route path = "/videos/upload" component={VideoUpload} exact />
						<Route path = "/videos" component={VideoList} exact />
						<Route path = "/videos/:id" component={VideoView} exact />

						<Route path = "/tests" component={TestList} exact />
						<Route path = "/tests/:id" component={TestView} exact />
					

						{/* Create Forms */}
						
						<Route path="/teachers/form" component={TeacherForm} exact />
						<Route path="/tests/form" component={TestForm} exact />
						<Route path="/users/form" component={UserForm} exact />
						{/* Update Forms */}
						<Route path="/students/form/:id" component={StudentForm} exact />
						<Route path="/teachers/form/:id" component={TeacherForm} exact />
						<Route path="/tests/form/:id" component={TestForm} exact />
					</BrowserRouter>
				</CssBaseline>
			</div>
		);
	}
}

export default App;
