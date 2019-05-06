import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormCard from "../General/FormCard";
import { renderTextField, formStyles, renderDropdownSelect } from "../../helpers/Form";
import { readOptions, createEntity } from "../../helpers/crud";

class UserForm extends React.Component {
	state = {
		username: "",
		password: "",
		role: "",
		studentID: "",
		teacherID: "",
		loading: true,
		students: [],
		teachers: [],
	};

	getFormValues = () => {
		const { username, password, role, studentID, teacherID } = this.state;
		if (role === "student") return { username, password, role, studentID };
		else if (role === "teacher") return { username, password, role, teacherID };
		else return { username, password, role };
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
				<form
					onSubmit={async e => {
						e.preventDefault();
						let success = await createEntity(this, this.getFormValues(), "signup");
						if (success)
							this.setState({
								username: "",
								password: "",
								role: "",
								studentID: "",
								teacherID: "",
								loading: false,
							});
					}}
					className={classes.container}
					autoComplete="disabled"
				>
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
