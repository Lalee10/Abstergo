import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormCard from "../General/FormCard";
import { renderTextField, renderRadioGroup, renderFileUploadField, formStyles } from "../../helpers/Form";
import { createEntity, readEntity, updateEntity } from "../../helpers/crud";

const defaultValues = {
	firstName: "",
	lastName: "",
	gender: "male",
	profilePicture: "",
};

class TeacherForm extends React.Component {
	state = {
		...defaultValues,
		loading: false,
		formTask: "create",
	};

	componentDidMount = async () => {
		const { match } = this.props;

		if (match.params.id) {
			this.setState({ loading: true });
			const response = await readEntity("teacher", match.params.id);
			if (response.teacherID) {
				const { firstName, lastName, gender } = response;
				this.setState({
					firstName,
					lastName,
					gender,
					loading: false,
					formTask: "update",
				});
			} else {
				this.setState({ loading: false });
			}
		}
	};

	render() {
		const { classes, history, match } = this.props;
		const { loading, formTask } = this.state;

		return (
			<FormCard formTitle="Teacher Form" loading={loading}>
				<form
					onSubmit={async e => {
						e.preventDefault();

						let success;
						if (formTask === "create") {
							success = await createEntity(this, this.state, "teacher");
						} else {
							success = await updateEntity(this, this.state, { teacherId: match.params.id }, "teacher");
							history.push(`/teachers/${match.params.id}`);
						}

						if (success) this.setState({ ...defaultValues, loading: false, formTask: "create" });
					}}
					encType="multipart/form-data"
					className={classes.container}
					autoComplete="disabled"
				>
					{renderTextField(this, "firstName")}
					{renderTextField(this, "lastName")}
					{renderRadioGroup(this, "gender", [
						{ value: "male", label: "Male" },
						{ value: "female", label: "Female" },
					])}
					{formTask === "create" && renderFileUploadField(this, "file")}

					<Button
						disabled={loading}
						size="large"
						variant="contained"
						className={classes.button}
						color="primary"
						type="submit"
					>
						{formTask === "create" ? "Add" : "Update"} Teacher
					</Button>
				</form>
			</FormCard>
		);
	}
}

export default withStyles(formStyles)(TeacherForm);
