import React, { Component } from "react";
import { Router, Route, Switch} from "react-router-dom";
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
import TeacherList from "./components/Main/TeacherCRUD/TeacherList";
import TeacherView from "./components/Main/TeacherCRUD/TeacherView"
import Teacher from "./components/Main/Teacher";
import VideoUpload from "./components/Main/Videos/Upload";
import VideoList from "./components/Main/Videos/List"
import VideoView from "./components/Main/Videos/View"
import TestList from "./components/Main/TestCRUD/TestList";
import TestView from "./components/Main/TestCRUD/TestView";
import Login from "./components/Main/Auth/Login";
import AuthHOC from "./components/AuthHOC/Auth";
import { login , asyncGetUser} from "./actions/auth";
import { connect } from "react-redux";
import axios from "axios";
import history from "./components/history.js";



toast.configure({
	position: toast.POSITION.TOP_RIGHT,
	autoClose: 3000,
});

function mapStateToProps(state){
	return {user: state.user}
}

class App extends Component {

	state = {loading: false}

	componentWillMount(){
		this.setState({loading: true})
		this.getUser();
	}

	getUser = () => {
		this.setState({loading: true})
		axios.get("/user").then(response => {
			if (response.status === 200){
				this.props.login(response.data);
			}
		this.setState({loading: false});
		})
	}


	renderApp = () => {
		if (this.props.user){
			return (
				<div>
				<CssBaseline>
					<Router history={history}>
						<Route path="/" component={AuthHOC(Dashboard, null, this.props.user)} exact />
						<Route path="/login" component={Login} exact />

						<Route path="/students" component={AuthHOC(Student, "admin", this.props.user)} exact />
						<Switch>
							<Route path="/students/view" component={AuthHOC(StudentList, "admin")} exact />
							<Route path="/students/form" component={AuthHOC(StudentForm, "admin")} exact />
							<Route path="/students/:id" component={AuthHOC(StudentView, "admin")} exact />
							<Route path="/students/form/:id" component={AuthHOC(StudentForm, "admin")} exact />
						</Switch>

						<Route path="/teachers" component={Teacher} exact />
						<Switch>
							<Route path="/teachers/view" component={AuthHOC(TeacherList, "admin")} exact />
							<Route path="/teachers/form" component={AuthHOC(TeacherForm, "admin")} exact />
							<Route path="/teachers/:id" component={AuthHOC(TeacherView, "admin")} exact />
							<Route path="/teachers/form/:id" component={AuthHOC(TeacherForm, "admin")} exact />
						</Switch>

						<Route path = "/videos" component={AuthHOC(VideoList)} exact />
						<Switch>
							<Route path = "/videos/upload" component={AuthHOC(VideoUpload, "teacher")} exact />
							<Route path = "/videos/:id" component={VideoView} exact />
						</Switch>
						
						<Route path = "/tests" component={AuthHOC(TestList, "teacher")} exact />
						<Switch>
							<Route path="/tests/form" component={AuthHOC(TestForm, "teacher")} exact />
							<Route path = "/tests/:id" component={AuthHOC(TestView, "teacher")} exact />
							<Route path="/tests/form/:id" component={AuthHOC(TestForm, "teacher")} exact />
						</Switch>

					

						{/* Create Forms */}
						
						<Route path="/users/form" component={UserForm} exact />
						{/* Update Forms */}
						
						
						
					</Router>
				</CssBaseline>
			</div>
			);
		
		}

		history.push("/login")
	}

	render() {
		
		return (
			<div>
				{ this.state.loading ? (<span>Loading...</span>):this.renderApp() }
			</div>
		);
		
	}
}

export default connect(mapStateToProps, {login, asyncGetUser})(App);
