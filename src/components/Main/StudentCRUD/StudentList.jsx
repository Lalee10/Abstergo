import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
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

class StudentList extends Component {
	renderStudents = () => {
		if (!this.state.students) {
			return <div />;
		}
		return this.state.students.map((student, index) => {
			return (
				<Fade>
					<Link className={this.props.classes.link} to={"/students/" + student.studentID}>
						<ListItem alignItems="flex-start">
							<ListItemAvatar>
								<Avatar src={student.imagePath} />
							</ListItemAvatar>
							<ListItemText
								primary={student.firstName + " " + student.lastName}
								secondary={
									<React.Fragment>
										<Typography
											component="span"
											className={this.props.classes.inline}
											color="textPrimary"
										>
											Grade: {student.grade}
										</Typography>
									</React.Fragment>
								}
							/>
							<Button className={this.props.classes.button} variant="contained" color="primary">
								{" "}
								View{" "}
							</Button>
						</ListItem>
					</Link>
				</Fade>
			);
		});
	};

	state = {
		students: null,
	};

	async componentDidMount() {
		const students = (await axios.get("/api/student")).data;
		this.setState({ students: students });
	}
	render() {
		return (
			<React.Fragment>
				<MyAppBar appBarTitle="View Students" />

				<Grid
					container
					spacing={16}
					justify="center"
					alignContent="center"
					className={this.props.classes.mainGrid}
				>
					<Fade in={true} timeout={1500}>
						<List className={this.props.classes.root}>{this.renderStudents()}</List>
					</Fade>
				</Grid>
			</React.Fragment>
		);
	}
}

StudentList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentList);
