import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { toast } from "react-toastify";
import MyAppBar from "../../General/AppBar";
import StudentTest from "../../Main/StudentCRUD/StudentTest";

const styles = theme => ({
	mainGrid: {
		marginTop: "32px",
		width: "80%",
		margin: "auto",
	},
});

const imgStyle = { margin: "auto", width: 200, height: 200, borderRadius: "20%" };

class TeacherView extends Component {
	state = { teacher: null, dialogOpen: false };

	openModal = () => {
		this.setState({ dialogOpen: true });
	};

	closeModal = () => {
		this.setState({ dialogOpen: false });
	};

	handleDelete = async () => {
		const response = await axios.delete("/api/teacher/", {
			data: { data: { teacherID: this.state.teacher.teacherID } },
		});
		if (response.status === 200) {
			toast.success("Deleted successfully");
			this.props.history.push("/teachers/view");
		} else {
			toast.error("There was an error deleting");
		}
	};

	async componentDidMount() {
		const teacher = (await axios.get("/api/teacher/" + this.props.match.params.id)).data;
		this.setState({ teacher: teacher });
	}

	renderTeacher = () => {
		const { teacher } = this.state;

		if (!teacher) {
			return <div />;
		}

		return (
			<Fade in={true} timeout={1500}>
				<Grid
					container
					spacing={16}
					justify="center"
					alignContent="center"
					alignItems="center"
					className={this.props.classes.mainGrid}
				>
					<Grid item className={this.props.classes.imageGrid} xs={12} sm={12} lg={4}>
						<img alt={teacher.firstName + " profile picture"} src={teacher.imagePath} style={imgStyle} />
					</Grid>

					<Grid item xs={12} lg={8}>
						<Card className={this.props.classes.infoCard}>
							<CardContent>
								<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
									{teacher.firstName + " " + teacher.lastName}
								</Typography>
								<Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
									Gender: {teacher.gender}
								</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid style={{ margin: "20px" }} container spacing={16} justify="space-evenly">
						<Grid item xs={6} lg={4}>
							<Link style={{ textDecoration: "none" }} to={`/teachers/form/${teacher.teacherID}`}>
								<Button
									fullWidth
									className={this.props.classes.button}
									variant="contained"
									color="primary"
								>
									Edit
								</Button>
							</Link>
						</Grid>
						<Grid item xs={6} lg={4}>
							<Button
								fullWidth
								onClick={this.openModal}
								className={this.props.classes.button}
								variant="contained"
								color="secondary"
							>
								Delete
							</Button>
						</Grid>

						<Grid item xs={6} lg={4}>
							<StudentTest refreshData={this.loadStudent} />
						</Grid>
					</Grid>
				</Grid>
			</Fade>
		);
	};

	render() {
		const { teacher } = this.state;

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
							{teacher
								? `Are you sure you want to delete ${teacher.firstName}  ${teacher.lastName}?`
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

				<MyAppBar appBarTitle="Teacher Profile" />

				{this.renderTeacher()}
			</div>
		);
	}
}

TeacherView.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeacherView);
