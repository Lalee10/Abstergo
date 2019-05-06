import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import FormDialog from "../../General/FormDialog";
import { readOptions } from "../../../helpers/crud";
import { renderDropdownSelect, formStyles } from "../../../helpers/Form";
import Axios from "axios";
import { toast } from "react-toastify";

class StudentTeacher extends Component {
	state = {
		studentID: "",
		teacherID: "",
		students: [],
		teachers: [],
		loading: true,
	};

	componentDidMount = async () => {
		this.setState({
			students: await readOptions("student"),
			teachers: await readOptions("teacher"),
			loading: false,
		});
	};

	handleSubmit = async () => {
		this.setState({ loading: true });

		const { studentID, teacherID } = this.state;
		const response = await Axios.put("/api/student/setTeacher", {
			studentID,
			teacherIDs: `${teacherID}`,
		});

		if (response.status === 200) {
			toast.success("Teacher assigned successfully");
			await this.props.refreshData();
			return true;
		} else {
			toast.error("There was an error assigning the teacher");
			return false;
		}

		this.setState({ loading: false });
	};

	render() {
		const { students, teachers, loading } = this.state;
		return (
			<FormDialog buttonText="Add Teacher" loading={loading} onSubmit={this.handleSubmit} formTitle="Teachers">
				{renderDropdownSelect(this, "studentID", students)}
				{renderDropdownSelect(this, "teacherID", teachers)}
			</FormDialog>
		);
	}
}

export default withStyles(formStyles)(StudentTeacher);
