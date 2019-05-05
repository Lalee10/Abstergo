import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormCard from "../General/FormCard";
import { renderTextField, formStyles, renderDropdownSelect } from "../../helpers/Form";
import { readEntities } from "../../helpers/crud";

class UserForm extends React.Component {
	state = {
		username: "",
		password: "",
		role: "",
		studentId: "",
		teacherId: "",
		loading: true,
		students: [],
		teachers: [],
	};

	convertToOptions = (arrayOfObjects, key) => {
		const options = [];
		arrayOfObjects.forEach(elem => options.push({ id: elem[key], label: `${elem.firstName} ${elem.lastName}` }));
		return options;
	};

	componentDidMount = async () => {
		const students = await readEntities("student");
		const teachers = await readEntities("teacher");
		console.log(students, teachers);
		this.setState({
			students: this.convertToOptions(students, "studentID"),
			teachers: this.convertToOptions(teachers, "teacherID"),
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
					{renderTextField(this, "password")}
					{renderDropdownSelect(this, "role", [
						{ id: "admin", label: "Admin" },
						{ id: "student", label: "Student" },
						{ id: "teacher", label: "Teacher" },
					])}
					{role === "student" && renderDropdownSelect(this, "studentId", students)}
					{role === "teacher" && renderDropdownSelect(this, "teacherId", teachers)}

					<Button type="submit" size="large" variant="contained" className={classes.button} color="primary">
						Add User
					</Button>
				</form>
			</FormCard>
		);
	}
}

export default withStyles(formStyles)(UserForm);
