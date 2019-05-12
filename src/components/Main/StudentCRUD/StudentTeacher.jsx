import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import FormDialog from "../../General/FormDialog";
import { readOptions } from "../../../helpers/crud";
import { renderDropdownSelect, formStyles } from "../../../helpers/Form";
import Axios from "axios";
import { toast } from "react-toastify";

class StudentTeacher extends Component {
	state = {
		studentID: this.props.studentID,
		teacherID: "",
		teachers: [],
		loading: true,
	};

	componentDidMount = async () => {
		this.setState({
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
			this.setState({ loading: false });
			return true;
		} else {
			toast.error("There was an error assigning the teacher");
			this.setState({ loading: false });
			return false;
		}
	};

	render() {
		const { teachers, loading } = this.state;
		return (
			<FormDialog buttonText="Assign Teacher" loading={loading} onSubmit={this.handleSubmit} formTitle="Teachers">
				{renderDropdownSelect(this, "teacherID", teachers)}
			</FormDialog>
		);
	}
}

export default withStyles(formStyles)(StudentTeacher);
