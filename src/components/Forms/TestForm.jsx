import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormCard from "../General/FormCard";
import { renderTextField, renderNumberField, formStyles } from "../../helpers/Form";
import { createEntity } from "../../helpers/crud";

const defaultValues = {
	testName: "",
	maxMarks: "",
	topic: "",
};

class TestForm extends React.Component {
	state = { ...defaultValues, loading: false };

	componentDidMount = () => {
		if (this.props.initialValues) {
			const { testName, maxMarks, topic } = this.props.initialValues;
			this.setState({
				testName,
				maxMarks,
				topic,
			});
		}
	};

	render() {
		const { classes } = this.props;

		return (
			<FormCard formTitle="Test Form">
				<form
					onSubmit={async e => {
						e.preventDefault();
						let success = await createEntity(this, this.state, "test");
						if (success) this.setState({ ...defaultValues, loading: false });
					}}
					className={classes.container}
					autoComplete="disabled"
				>
					{renderTextField(this, "testName")}
					{renderNumberField(this, "maxMarks")}
					{renderTextField(this, "topic")}

					<Button type="submit" size="large" variant="contained" className={classes.button} color="primary">
						Add Test
					</Button>
				</form>
			</FormCard>
		);
	}
}

export default withStyles(formStyles)(TestForm);
