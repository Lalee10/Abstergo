import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Slide from "@material-ui/core/Slide";

class FormCard extends Component {
	render() {
		return (
			<React.Fragment>
				<AppBar position="static" style={{ alignItems: "center" }}>
					<Toolbar>
						<Typography variant="h6" color="inherit" align="center" noWrap>
							{this.props.formTitle}
						</Typography>
					</Toolbar>
				</AppBar>
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
