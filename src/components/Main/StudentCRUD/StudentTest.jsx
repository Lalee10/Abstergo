import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import FormDialog from "../../General/FormDialog";
import { readOptions } from "../../../helpers/crud";
import { renderDropdownSelect, renderNumberField, formStyles } from "../../../helpers/Form";
import Axios from "axios";
import { toast } from "react-toastify";

class StudentTest extends Component {
	state = {
		studentID: "",
		testID: "",
		obtainedMarks: "",
		students: [],
		tests: [],
		loading: true,
	};

	componentDidMount = async () => {
		this.setState({
			students: await readOptions("student"),
			tests: await readOptions("test"),
			loading: false,
		});
	};

	handleSubmit = async () => {
		this.setState({ loading: true });

		const { studentID, testID, obtainedMarks } = this.state;
		const response = await Axios.post("/api/test/updateMarks", {
			marks: [{ studentID, testID, obtainedMarks: parseInt(obtainedMarks) }],
		});

		if (response.status === 200) {
			toast.success("Test added successfully");
			await this.props.refreshData();
			this.setState({ loading: false });
			return true;
		} else {
			toast.error("There was an error adding the test");
			this.setState({ loading: false });
			return false;
		}
	};

	render() {
		const { students, tests, loading } = this.state;
		return (
			<FormDialog buttonText="Add Test" loading={loading} onSubmit={this.handleSubmit} formTitle="Student Test">
				{renderDropdownSelect(this, "studentID", students)}
				{renderDropdownSelect(this, "testID", tests)}
				{renderNumberField(this, "obtainedMarks")}
			</FormDialog>
		);
	}
}

export default withStyles(formStyles)(StudentTest);
