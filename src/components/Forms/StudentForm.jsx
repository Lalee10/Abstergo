import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormCard from "../General/FormCard";
import { renderTextField, renderNumberField, renderRadioGroup, formStyles } from "../../helpers/Form";
import { createEntity } from "../../helpers/crud";

const defaultValues = {
	firstName: "",
	lastName: "",
	age: "",
	gender: "male",
	grade: "",
};

class StudentForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			...defaultValues,
			loading: false,
		};
	}

	componentDidMount = () => {
		if (this.props.initialValues) {
			const { firstName, lastName, age, gender, grade } = this.props.initialValues;
			this.setState({
				firstName,
				lastName,
				gender,
				age,
				grade,
			});
		}
	};

	render() {
		const { classes } = this.props;
		const { loading } = this.state;

		return (
			<FormCard formTitle="Student Form" loading={loading}>
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
					{renderNumberField(this, "age")}
					{renderNumberField(this, "grade")}
					{renderRadioGroup(this, "gender", [
						{ value: "male", label: "Male" },
						{ value: "female", label: "Female" },
					])}

					<Button
						disabled={loading}
						size="large"
						variant="contained"
						className={classes.button}
						color="primary"
						type="submit"
					>
						Add Student
					</Button>
				</form>
			</FormCard>
		);
	}
}

export default withStyles(formStyles)(StudentForm);
