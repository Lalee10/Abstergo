import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import FormCard from "../../General/FormCard";
import { readOptions, readEntity } from "../../../helpers/crud";
import { formStyles, renderSelectCustomHandle } from "../../../helpers/Form";

class StudentTests extends Component {
	state = {
		students: [],
		studentDetails: {},
		studentID: "",
		loading: true,
	};

	componentDidMount = async () => {
		this.setState({
			students: await readOptions("student"),
			loading: false,
		});
	};

	handleSelectChange = async e => {
		const { name, value } = e.target;
		const response = await readEntity("student", value);
		console.log(name, value, response);
		this.setState({ [name]: value, studentDetails: response });
	};

	render() {
		const { students } = this.state;
		return (
			<React.Fragment>
				<FormCard formTitle="Student Tests">
					{renderSelectCustomHandle(this, "studentID", students, this.handleSelectChange)}
				</FormCard>
			</React.Fragment>
		);
	}
}

export default withStyles(formStyles)(StudentTests);
