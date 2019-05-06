import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import axios from "axios";
import MyAppBar from "../../General/AppBar";

const styles = theme => ({
	mainGrid: {
		marginTop: "64px",
	},

	appBar: {
		alignItems: "center",
	},

	link: {
		textDecoration: "none",
	},

	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: "inline",
	},
	button: {
		position: "relative",
		top: "6px",
	},
});

class TestList extends Component {
	state = { tests: null };

	async componentDidMount() {
		const tests = (await axios.get("/api/test")).data;
		this.setState({ tests: tests });
		console.log(tests);
	}

	renderTests = () => {
		if (!this.state.tests) {
			return <div />;
		}
		return this.state.tests.map((test, index) => {
			return (
				<Fade in={true} timeout={500 * (index + 1)}>
					<Link style={{ textDecoration: "none" }} to={"/tests/" + test.testID}>
						<ListItem alignItems="flex-start" key={test.testID}>
							<ListItemText
								primary={test.Name}
								secondary={
									<React.Fragment>
										<Typography
											component="span"
											className={this.props.classes.inline}
											color="textPrimary"
										>
											Topic: {test.topic}
										</Typography>
									</React.Fragment>
								}
							/>
							<Button className={this.props.classes.button} variant="contained" color="primary">
								View
							</Button>
						</ListItem>
					</Link>
				</Fade>
			);
		});
	};

	render() {
		return (
			<div>
				<MyAppBar appBarTitle="Test Details" />

				<Grid
					container
					spacing={16}
					justify="center"
					alignContent="center"
					className={this.props.classes.mainGrid}
				>
					<List className={this.props.classes.root}>{this.renderTests()}</List>
				</Grid>
			</div>
		);
	}
}

TestList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TestList);
