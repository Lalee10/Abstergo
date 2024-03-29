import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
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

class TeacherList extends Component {
	state = { teachers: null };

	async componentDidMount() {
		const teachers = (await axios.get("/api/teacher")).data;
		this.setState({ teachers: teachers });
		console.log(teachers);
	}

	renderTeachers = () => {
		if (!this.state.teachers) {
			return <div />;
		}
		return this.state.teachers.map((teacher, index) => {
			return (
				<Link to={"/teachers/" + teacher.teacherID} style={{ textDecoration: "none" }}>
					<ListItem alignItems="flex-start" key={teacher.teacherID}>
						<ListItemAvatar>
							<Avatar src={teacher.imagePath} />
						</ListItemAvatar>

						<ListItemText primary={teacher.firstName + " " + teacher.lastName} />
						<Button className={this.props.classes.button} variant="contained" color="primary">
							View
						</Button>
					</ListItem>
				</Link>
			);
		});
	};

	render() {
		return (
			<React.Fragment>
				<MyAppBar appBarTitle="View Teachers" />

				<Grid
					container
					spacing={16}
					justify="center"
					alignContent="center"
					className={this.props.classes.mainGrid}
				>
					<Fade in={true} timeout={1500}>
						<List className={this.props.classes.root}>{this.renderTeachers()}</List>
					</Fade>
				</Grid>
			</React.Fragment>
		);
	}
}

TeacherList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeacherList);
