import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormCard from "../General/FormCard";
import { renderTextField, formStyles } from "../../helpers/Form";
import { readEntity, updateEntity, createEntityDesi } from "../../helpers/crud";

const defaultValues = {
	testName: "",
	maxMarks: "",
	topic: "",
};

class TestForm extends React.Component {
	state = {
		...defaultValues,
		loading: false,
		formTask: "create",
	};

	componentDidMount = async () => {
		const { match } = this.props;

		if (match.params.id) {
			this.setState({ loading: true });
			const response = await readEntity("test", match.params.id);
			if (response.testID) {
				const { testName, maxMarks, topic } = response;
				this.setState({
					testName,
					maxMarks,
					topic,
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
			<FormCard formTitle="Test Form" loading={loading}>
				<form
					onSubmit={async e => {
						e.preventDefault();

						let success;
						if (formTask === "create") {
							success = await createEntityDesi(this, this.state, "test");
						} else {
							success = await updateEntity(this, this.state, { testId: match.params.id }, "test");
							history.push(`/tests/${match.params.id}`);
						}

						if (success) this.setState({ ...defaultValues, loading: false, formTask: "create" });
					}}
					className={classes.container}
					autoComplete="disabled"
				>
					{renderTextField(this, "testName")}
					{renderTextField(this, "maxMarks")}
					{renderTextField(this, "topic")}

					<Button
						disabled={loading}
						size="large"
						variant="contained"
						className={classes.button}
						color="primary"
						type="submit"
					>
						{formTask === "create" ? "Add" : "Update"} Test
					</Button>
				</form>
			</FormCard>
		);
	}
}

export default withStyles(formStyles)(TestForm);
