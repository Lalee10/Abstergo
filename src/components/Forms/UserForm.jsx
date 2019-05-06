import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormCard from "../General/FormCard";
import { renderTextField, formStyles, renderDropdownSelect } from "../../helpers/Form";
import { readOptions } from "../../helpers/crud";
import Axios from "axios";
import { toast } from "react-toastify";

class UserForm extends React.Component {
	state = {
		abcd: "",
		efgh: "",
		role: "",
		studentID: "",
		teacherID: "",
		loading: true,
		students: [],
		teachers: [],
	};

	handleSubmit = async () => {
		this.setState({ loading: true });
		const { username, password, role, studentID, teacherID } = this.state;
		let data = {
			username,
			password,
			role,
		};
		if (role === "student") {
			data.studentID = studentID;
		}
		if (role === "teacher") {
			data.teacherID = teacherID;
		}

		const response = await Axios.post("/signup", data);
		if (response.status === 200) {
			toast.success("User created successfully");
			this.props.history.push("/login");
		} else {
			toast.error("There was an error registering the user");
		}
		this.setState({ loading: false });
	};

	componentDidMount = async () => {
		this.setState({
			students: await readOptions("student"),
			teachers: await readOptions("teacher"),
			loading: false,
		});
	};

	render() {
		const { classes } = this.props;
		const { role, students, teachers, loading } = this.state;

		return (
			<FormCard formTitle="User Form" loading={loading}>
				<form className={classes.container} autoComplete="disabled">
					{renderTextField(this, "username")}
					{renderTextField(this, "password", "password")}
					{renderDropdownSelect(this, "role", [
						{ id: "admin", label: "Admin" },
						{ id: "student", label: "Student" },
						{ id: "teacher", label: "Teacher" },
					])}
					{role === "student" && renderDropdownSelect(this, "studentID", students)}
					{role === "teacher" && renderDropdownSelect(this, "teacherID", teachers)}

					<Button
						onClick={this.handleSubmit}
						size="large"
						variant="contained"
						className={classes.button}
						color="primary"
					>
						Add User
					</Button>
				</form>
			</FormCard>
		);
	}
}

export default withStyles(formStyles)(UserForm);
