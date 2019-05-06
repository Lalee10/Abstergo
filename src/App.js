import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
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
import TeacherView from "./components/Main/TeacherCRUD/TeacherView";
import Teacher from "./components/Main/Teacher";
import VideoUpload from "./components/Main/Videos/Upload";
import VideoList from "./components/Main/Videos/List";
import VideoView from "./components/Main/Videos/View";
import TestList from "./components/Main/TestCRUD/TestList";
import TestView from "./components/Main/TestCRUD/TestView";
import Login from "./components/Main/Auth/Login";
import StudentTests from "./components/Main/Student/StudentTests";
import AuthHOC from "./components/AuthHOC/Auth";
import axios from "axios";
import history from "./components/history.js";
import CircularProgress from "@material-ui/core/CircularProgress";

toast.configure({
	position: toast.POSITION.TOP_RIGHT,
	autoClose: 3000,
});

function mapStateToProps(state) {
	return { user: state.user };
}

class App extends Component {
	state = { loading: true, user: null };

	componentDidMount() {
		this.getUser();
	}

	getUser = () => {
		axios
			.get("/user")
			.then(response => {
				if (response.status === 200) {
					this.setState({ user: response.data });
				}
				console.log("SETTING LOADING FALSE");
				this.setState({ loading: false });
			})
			.catch(() => {
				history.push("/login");
				this.setState({ loading: false });
			});
	};

	renderApp = () => {
		if (this.state.user) {
			return (
				<div>
					<CssBaseline>
						<Router history={history}>
							<Route path="/" component={AuthHOC(Dashboard, null, this, this)} exact />
							<Route path="/login" render={() => <Login appRef={this} history={history} />} exact />

							<Route path="/students" component={AuthHOC(Student, "admin", this)} exact />
							<Switch>
								<Route path="/students/view" component={AuthHOC(StudentList, "admin", this)} exact />
								<Route path="/students/form" component={AuthHOC(StudentForm, "admin", this)} exact />
								<Route path="/students/:id" component={AuthHOC(StudentView, "admin", this)} exact />
								<Route
									path="/students/form/:id"
									component={AuthHOC(StudentForm, "admin", this)}
									exact
								/>
								<Route path="/students/tests" component={AuthHOC(StudentView, "admin", this)} exact />
							</Switch>

							<Route path="/teachers" component={Teacher} exact />
							<Switch>
								<Route path="/teachers/view" component={AuthHOC(TeacherList, "admin", this)} exact />
								<Route path="/teachers/form" component={AuthHOC(TeacherForm, "admin", this)} exact />
								<Route path="/teachers/:id" component={AuthHOC(TeacherView, "admin", this)} exact />
								<Route
									path="/teachers/form/:id"
									component={AuthHOC(TeacherForm, "admin", this)}
									exact
								/>
							</Switch>

							<Route path="/videos" component={AuthHOC(VideoList, this)} exact />
							<Switch>
								<Route path="/videos/upload" component={AuthHOC(VideoUpload, "teacher", this)} exact />
								<Route path="/videos/:id" component={VideoView} exact />
							</Switch>

							<Route path="/tests" component={AuthHOC(TestList, "teacher", this)} exact />
							<Switch>
								<Route path="/tests/form" component={AuthHOC(TestForm, "teacher", this)} exact />
								<Route path="/tests/:id" component={AuthHOC(TestView, "teacher", this)} exact />
								<Route path="/tests/form/:id" component={AuthHOC(TestForm, "teacher", this)} exact />
							</Switch>

							<Route path="/users/form" component={UserForm} exact />
						</Router>
					</CssBaseline>
				</div>
			);
		}

		return (
			<Router history={history}>
				<Route path="/login" render={() => <Login appRef={this} history={history} />} exact />
			</Router>
		);
	};

	render() {
		return (
			<div>
				{this.state.loading ? (
					<div
						style={{
							width: "100vw",
							height: "100vh",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<CircularProgress />
					</div>
				) : (
					this.renderApp()
				)}
			</div>
		);
	}
}

export default App;
