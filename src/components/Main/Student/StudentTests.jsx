import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import FormCard from "../../General/FormCard";
import { readOptions } from "../../../helpers/crud";
import { renderDropdownSelect, formStyles } from "../../../helpers/Form";

class StudentTests extends Component {
	state = {
		students: [],
		studentID: "",
		loading: true,
	};

	componentDidMount = async () => {
		this.setState({
			students: await readOptions("student"),
			loading: false,
		});
	};

	render() {
		const { students } = this.state;
		return <FormCard formTitle="Student Tests">{renderDropdownSelect(this, "studentID", students)}</FormCard>;
	}
}

export default withStyles(formStyles)(StudentTests);
