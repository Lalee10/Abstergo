import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { readEntities } from "../../../helpers/crud";

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
	state = {
        students: [],
		loading: true,
	};

	componentDidMount = async () => {
        let response = readEntities
    };

	renderStudent = student => (
		<ListItem alignItems="flex-start">
			<ListItemAvatar>
				<Avatar src="/elliot.jpg" />
			</ListItemAvatar>
			<ListItemText
				primary={`${student.firstName} ${student.lastName}`}
				secondary={
					<React.Fragment>
						<Typography component="span" className={this.props.classes.inline} color="textPrimary">
							{student.grade}
						</Typography>
					</React.Fragment>
				}
			/>
			<Link to={`/students/view/${student.studentId}`} style={{ textDecoration: "none" }}>
				<Button className={this.props.classes.button} variant="contained" color="primary">
					View
				</Button>
			</Link>
		</ListItem>
	);

	render() {
		return (
			<div>
				<AppBar position="static" className={this.props.classes.appBar}>
					<Toolbar>
						<Typography variant="h6" color="inherit" align="center" noWrap>
							View Students
						</Typography>
					</Toolbar>
				</AppBar>

				<Grid
					container
					spacing={16}
					justify="center"
					alignContent="center"
					className={this.props.classes.mainGrid}
				>
					<List className={this.props.classes.root} />
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(StudentList);
