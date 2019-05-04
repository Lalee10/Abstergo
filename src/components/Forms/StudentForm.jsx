import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormCard from "../General/FormCard";
import { renderTextField, renderNumberField, renderRadioGroup, formStyles } from "../../helpers/Form";
import { createEntity, readEntity, updateEntity } from "../../helpers/crud";

const defaultValues = {
	firstName: "",
	lastName: "",
	age: "",
	gender: "male",
	grade: "",
};

class StudentForm extends React.Component {
	state = {
		...defaultValues,
		loading: false,
		formTask: "create",
	};

	componentDidMount = async () => {
		const { match } = this.props;

		if (match) {
			this.setState({ loading: true });
			const response = await readEntity("student", match.params.id);
			if (response.data) {
				const { firstName, lastName, age, gender, grade } = response.data;
				this.setState({
					firstName,
					lastName,
					age,
					gender,
					grade,
					loading: false,
					formTask: "update",
				});
			} else {
				this.setState({ loading: false });
			}
		}
	};

	render() {
		const { classes } = this.props;
		const { loading, formTask } = this.state;

		return (
			<FormCard formTitle="Student Form" loading={loading}>
				<form
					onSubmit={async e => {
						e.preventDefault();

						let success;
						if (formTask === "create") {
							success = await createEntity(this, this.state, "student");
						} else {
							success = await updateEntity(
								this,
								this.state,
								{ studentId: this.props.match.params.id },
								"student"
							);
						}

						if (success) this.setState({ ...defaultValues, loading: false, formTask: "create" });
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
						{formTask === "create" ? "Add" : "Update"} Student
					</Button>
				</form>
			</FormCard>
		);
	}
}

export default withStyles(formStyles)(StudentForm);
