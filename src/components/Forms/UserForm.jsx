import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormCard from "../General/FormCard";
import { renderTextField, formStyles } from "../../helpers/Form";

class UserForm extends React.Component {
	state = {
		username: "",
		password: "",
	};

	render() {
		const { classes } = this.props;

		return (
			<FormCard formTitle="User Form">
				<form className={classes.container} autoComplete="disabled">
					{renderTextField(this, "username")}
					{renderTextField(this, "password")}

					<Button type="submit" size="large" variant="contained" className={classes.button} color="primary">
						Add User
					</Button>
				</form>
			</FormCard>
		);
	}
}

export default withStyles(formStyles)(UserForm);
