import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import Slide from "@material-ui/core/Slide";
import AppBar from "../General/AppBar";

class FormCard extends Component {
	render() {
		return (
			<React.Fragment>
				<AppBar appBarTitle={this.props.formTitle} />
				<Slide direction="up" in={true} timeout={1000}>
					<Card className="form-card" raised={true}>
						<CardContent>{this.props.children}</CardContent>
						<LinearProgress hidden={!this.props.loading} />
					</Card>
				</Slide>
			</React.Fragment>
		);
	}
}

export default FormCard;
