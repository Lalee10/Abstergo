import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";

export default class FormDialog extends React.Component {
	state = {
		open: false,
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	callSubmit = async () => {
		const success = await this.props.onSubmit();
		if (success) {
			this.handleClose();
		}
	};

	render() {
		const { children, formTitle, loading, color, buttonText } = this.props;
		return (
			<React.Fragment>
				<Button fullWidth variant="contained" color={color || "primary"} onClick={this.handleClickOpen}>
					{buttonText}
				</Button>
				<Dialog
					fullWidth
					maxWidth="sm"
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">{formTitle}</DialogTitle>
					<DialogContent>{children}</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.callSubmit} color="primary">
							Save
						</Button>
					</DialogActions>
					<LinearProgress hidden={!loading} />
				</Dialog>
			</React.Fragment>
		);
	}
}
