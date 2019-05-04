import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormCard from "../General/FormCard";
import { renderTextField, renderRadioGroup, formStyles } from "../../helpers/Form";
import { createEntity } from "../../helpers/crud";

const defaultValues = {
	firstName: "",
	lastName: "",
	gender: "male",
};

class TeacherForm extends React.Component {
	state = {
		...defaultValues,
		loading: false,
	};

	componentDidMount = () => {
		if (this.props.initialValues) {
			const { firstName, lastName, gender } = this.props.initialValues;
			this.setState({
				firstName,
				lastName,
				gender,
			});
		}
	};

	render() {
		const { loading } = this.state;
		const { classes } = this.props;

		return (
			<FormCard formTitle="Teacher Form" loading={loading}>
				<form
					onSubmit={async e => {
						e.preventDefault();
						let success = await createEntity(this, this.state, "student");
						if (success) this.setState({ ...defaultValues, loading: false });
					}}
					className={classes.container}
					autoComplete="disabled"
				>
					{renderTextField(this, "firstName")}
					{renderTextField(this, "lastName")}
					{renderRadioGroup(this, "gender", [
						{ value: "male", label: "Male" },
						{ value: "female", label: "Female" },
					])}

					<Button type="submit" size="large" variant="contained" className={classes.button} color="primary">
						Add Teacher
					</Button>
				</form>
			</FormCard>
		);
	}
}

export default withStyles(formStyles)(TeacherForm);
