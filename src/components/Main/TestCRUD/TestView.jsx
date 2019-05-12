import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MyAppBar from "../../General/AppBar";

function compare(a, b) {
	if (a.obtainedMarks < b.obtainedMarks) {
		return -1;
	}
	if (a.obtainedMarks > b.obtainedMarks) {
		return 1;
	}
	return 0;
}

const styles = theme => ({
	mainGrid: {
		marginTop: "32px",
		margin: "auto",
		width: "60%",
	},

	graphGrid: {
		marginTop: "24px",
		marginBottom: "24px",
	},
});

class TestView extends Component {
	state = { test: null, showGraph: false, dialogOpen: false };

	showGraph = () => {
		this.setState({ showGraph: true });
	};

	openModal = () => {
		this.setState({ dialogOpen: true });
	};

	closeModal = () => {
		this.setState({ dialogOpen: false });
	};

	handleDelete = async () => {
		const response = await axios.delete("/api/test/", {
			data: { data: { testID: this.state.test.testID } },
		});

		if (response.status === 200) {
			toast.success("Deleted successfully");
			this.props.history.push("/tests/view");
		} else {
			toast.error("There was an error deleting");
		}
	};

	renderTest = () => {
		const { test } = this.state;

		if (!test) {
			return <div />;
		} else {
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
						<Grid item xs={12} lg={8}>
							<Card>
								<CardContent>
									<Typography
										component="h1"
										variant="h2"
										align="center"
										color="textPrimary"
										gutterBottom
									>
										{test.testName}
									</Typography>
									<Typography
										component="h1"
										variant="h5"
										align="center"
										color="textPrimary"
										gutterBottom
									>
										Topic : {test.topic}
									</Typography>
									<Typography
										component="h1"
										variant="h5"
										align="center"
										color="textPrimary"
										gutterBottom
									>
										Max Marks: {test.maxMarks}
									</Typography>
									<Typography
										component="h1"
										variant="h5"
										align="center"
										color="textPrimary"
										gutterBottom
									>
										Number of Students: {test.students.length}
									</Typography>
								</CardContent>
							</Card>
						</Grid>

						<Grid style={{ margin: "20px" }} container spacing={16} justify="center">
							<Grid item xs={6} lg={3}>
								<Link style={{ textDecoration: "none" }} to={`/tests/form/${test.testID}`}>
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
						</Grid>
					</Grid>
				</Fade>
			);
		}
	};

	renderChart = () => {
		const { test } = this.state;
		if (!test) {
			return <div />;
		}
		const studentArray = test.students.map(student => {
			let newStudent = student;
			newStudent.obtainedMarks = student.StudentTest.obtainedMarks;
			return newStudent;
		});
		const studentMarks = studentArray.sort(compare);
		return (
			<Grid
				container
				className={this.props.classes.graphGrid}
				spacing={16}
				justify="center"
				alignContent="center"
			>
				{!this.state.showGraph ? (
					<Button variant="contained" color="secondary" onClick={this.showGraph}>
						<Typography variant="h2">
							<FontAwesomeIcon icon={faChartBar} />
						</Typography>
						<br />
						<Typography variant="h6" />
					</Button>
				) : (
					<Fade in={true} timeout={1000}>
						<LineChart width={600} height={300} data={studentMarks}>
							<XAxis dataKey="firstName" />
							<YAxis dataKey="obtainedMarks" />
							<CartesianGrid strokeDasharray="3 3" />
							<Tooltip />
							<Legend />
							<Line
								isAnimationActive={false}
								type="monotone"
								dataKey="obtainedMarks"
								stroke="#8884d8"
								activeDot={{ r: 8 }}
							/>
						</LineChart>
					</Fade>
				)}
			</Grid>
		);
	};

	async componentDidMount() {
		const test = (await axios.get("/api/test/" + this.props.match.params.id)).data;
		this.setState({ test: test });
	}
	render() {
		const { test } = this.state;
		return (
			<React.Fragment>
				<MyAppBar appBarTitle={test ? test.testName : "Loading..."} />

				<Dialog
					open={this.state.dialogOpen}
					onClose={this.closeModal}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{test ? `Are you sure you want to delete ${test.testName}?` : ""}
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

				{this.renderTest()}

				{this.renderChart()}
			</React.Fragment>
		);
	}
}

TestView.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TestView);
