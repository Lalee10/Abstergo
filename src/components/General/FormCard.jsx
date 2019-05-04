import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

class FormCard extends Component {
	render() {
		return (
			<Card className="form-card" raised={true}>
				<CardContent>
					<Typography
						style={{ marginLeft: "10px" }}
						component="h1"
						variant="h4"
						color="textPrimary"
						gutterBottom
					>
						{this.props.formTitle}
					</Typography>
					{this.props.children}
				</CardContent>
				<LinearProgress hidden={!this.props.loading} />
			</Card>
		);
	}
}

export default FormCard;
