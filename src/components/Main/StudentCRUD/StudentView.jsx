import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { CardContent, Paper } from "@material-ui/core";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMarker, faUser } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import MyAppBar from "../../General/AppBar";
import StudentTest from "./StudentTest";
import StudentTeacher from "./StudentTeacher";

const styles = theme => ({
	mainGrid: {
		marginTop: "32px",
		margin: "auto",
		width: "80%",
	},

	imageGrid: {},

	cardMedia: {
		paddingTop: "25%", // 16:9
	},

	infoCard: {},

	appBar: {
		alignItems: "center",
	},

	marginBottom: {
		marginBottom: "16px",
	},

	leftMargin: {
		width: "90vw",
		margin: "0 auto",
	},
});

const imgStyle = { margin: "auto", width: 256, height: 256, borderRadius: "20%" };

class StudentView extends Component {
	state = { student: null, dialogOpen: false };

	openModal = () => {
		this.setState({ dialogOpen: true });
	};

	closeModal = () => {
		this.setState({ dialogOpen: false });
	};

	handleDelete = async () => {
		const response = await axios.delete("/api/student/", {
			data: { data: { studentID: this.state.student.studentID } },
		});

		if (response.status === 200) {
			toast.success("Deleted successfully");
			this.props.history.push("/students/view");
		} else {
			toast.error("There was an error deleting");
		}
	};

	async componentDidMount() {
		await this.loadStudent();
	}

	loadStudent = async () => {
		const student = (await axios.get("/api/student/" + this.props.match.params.id)).data;
		this.setState({ student: student });
	};

	renderStudent = () => {
		const { student } = this.state;

		if (!student) {
			return <div />;
		}

		return (
			<Grid
				container
				spacing={16}
				justify="center"
				alignContent="center"
				alignItems="center"
				className={this.props.classes.mainGrid}
			>
				<Grid item className={this.props.classes.imageGrid} xs={12} sm={12} lg={4}>
					<img alt={student.firstName + " profile picture"} src={student.imagePath} style={imgStyle} />
				</Grid>

				<Grid item xs={12} lg={8}>
					<Card className={this.props.classes.infoCard}>
						<CardContent>
							<Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
								{student.firstName + " " + student.lastName}
							</Typography>
							<Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
								Grade: {student.grade}
							</Typography>
							<Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
								Age: {student.age}
							</Typography>
							<Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
								Gender: {student.gender}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid style={{ margin: "20px" }} container spacing={16} justify="space-evenly">
					<Grid item xs={6} lg={3}>
						<Link style={{ textDecoration: "none" }} to={`/students/form/${student.studentID}`}>
							<Button fullWidth variant="contained" color="primary">
								Edit
							</Button>
						</Link>
					</Grid>
					<Grid item xs={6} lg={3}>
						<Button fullWidth onClick={this.openModal} variant="contained" color="secondary">
							Delete
						</Button>
					</Grid>

					<Grid item xs={6} lg={3}>
						<StudentTest refreshData={this.loadStudent} />
					</Grid>

					<Grid item xs={6} lg={3}>
						<StudentTeacher refreshData={this.loadStudent} />
					</Grid>
				</Grid>

				<Grid container justify="space-between">
					<Grid item lg={4} xs={12}>
						<FontAwesomeIcon icon={faMarker} /> Marks
						<List>
							{student.tests.map(test => {
								return (
									<Paper>
										<ListItem divider className={this.props.classes.testCard}>
											<ListItemText
												primary={test.testName}
												secondary={
													"Marks:    " + test.StudentTest.obtainedMarks + "/" + test.maxMarks
												}
											/>
										</ListItem>
									</Paper>
								);
							})}
						</List>
					</Grid>
					<Grid item lg={4} xs={12}>
						<FontAwesomeIcon icon={faUser} /> Teachers
						<List>
							{student.teachers.map(teacher => {
								return (
									<Paper>
										<ListItem divider className={this.props.classes.testCard}>
											<ListItemText primary={teacher.firstName + " " + teacher.lastName} />
										</ListItem>
									</Paper>
								);
							})}
						</List>
					</Grid>
				</Grid>
			</Grid>
		);
	};

	render() {
		const { student } = this.state;
		return (
			<div>
				<Dialog
					open={this.state.dialogOpen}
					onClose={this.closeModal}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{student
								? `Are you sure you want to delete ${student.firstName}  ${student.lastName}?`
								: ""}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.closeModal} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleDelete} color="primary">
							Delete
						</Button>
					</DialogActions>
				</Dialog>

				<MyAppBar appBarTitle="Student Profile" />

				{this.renderStudent()}
			</div>
		);
	}
}

StudentView.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentView);
