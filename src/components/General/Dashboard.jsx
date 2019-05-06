import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faBook, faChalkboardTeacher, faVideo, faIdCard } from "@fortawesome/free-solid-svg-icons";
import MyAppBar from "./AppBar";

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

const styles = theme => ({
	mainGrid: {
		marginTop: "64px",
		margin: "auto",
	},

	cardGrid: {},

	card: {
		transition: "1s",
		boxShadow: "3px 3px #888888",
		cursor: "pointer",
		"&:hover": {
			boxShadow: "10px 12px #888888",
			transform: "translate(0px,-20px) rotate(2deg)",
		},
	},

	icon: {
		fontSize: "250%",
		marginBottom: "0.45em",
	},

	appBar: {
		alignItems: "center",
	},

	link: {
		textDecoration: "none",
	},
});

class Dashboard extends React.Component {
	render() {
		return (
			<React.Fragment>
				<MyAppBar appBarTitle="Dashboard" />
				<Fade in={true} timeout={1000}>
					<Grid
						className={this.props.classes.mainGrid}
						container
						spacing={16}
						justify="center"
						alignContent="center"
					>
						{this.props.user.role === "admin" ? (
							<Grid className={this.props.classes.cardGrid} item sm={12} md={4} lg={3}>
								<Link to="/students" className={this.props.classes.link}>
									<Card className={this.props.classes.card}>
										<CardContent>
											<Typography
												component="h1"
												variant="h2"
												align="center"
												color="textPrimary"
												gutterBottom
											>
												<FontAwesomeIcon
													className={this.props.classes.icon}
													component="h1"
													variant="h1"
													align="center"
													icon={faUserGraduate}
												/>
												<br />
												Students
											</Typography>
										</CardContent>
									</Card>
								</Link>
							</Grid>
						) : (
							<span />
						)}

						{this.props.user.role === "admin" ? (
							<Grid className={this.props.classes.cardGrid} item sm={12} md={4} lg={3}>
								<Link to="/teachers" className={this.props.classes.link}>
									<Card className={this.props.classes.card}>
										<CardContent>
											<Typography
												component="h1"
												variant="h2"
												align="center"
												color="textPrimary"
												gutterBottom
											>
												<FontAwesomeIcon
													className={this.props.classes.icon}
													component="h1"
													variant="h1"
													align="center"
													icon={faChalkboardTeacher}
												/>
												<br />
												Teachers
											</Typography>
										</CardContent>
									</Card>
								</Link>
							</Grid>
						) : (
							<span />
						)}

						{this.props.user.role === "teacher" ? (
							<Grid className={this.props.classes.cardGrid} item sm={12} md={4} lg={3}>
								<Link to="/tests" className={this.props.classes.link}>
									<Card className={this.props.classes.card}>
										<CardContent>
											<Typography
												component="h1"
												variant="h2"
												align="center"
												color="textPrimary"
												gutterBottom
											>
												<FontAwesomeIcon
													className={this.props.classes.icon}
													component="h1"
													variant="h1"
													align="center"
													icon={faBook}
												/>
												<br />
												Tests
											</Typography>
										</CardContent>
									</Card>
								</Link>
							</Grid>
						) : (
							<span />
						)}

						{this.props.user ? (
							<Grid className={this.props.classes.cardGrid} item sm={12} md={4} lg={3}>
								<Link to="/videos/" className={this.props.classes.link}>
									<Card className={this.props.classes.card}>
										<CardContent>
											<Typography
												component="h1"
												variant="h2"
												align="center"
												color="textPrimary"
												gutterBottom
											>
												<FontAwesomeIcon
													className={this.props.classes.icon}
													component="h1"
													variant="h1"
													align="center"
													icon={faVideo}
												/>
												<br />
												Videos
											</Typography>
										</CardContent>
									</Card>
								</Link>
							</Grid>
						) : (
							<span />
						)}

						{this.props.user.role === "student" ? (
							<Grid className={this.props.classes.cardGrid} item sm={12} md={4} lg={3}>
								<Link to={"/students/" + this.props.user.studentID} className={this.props.classes.link}>
									<Card className={this.props.classes.card}>
										<CardContent>
											<Typography
												component="h1"
												variant="h2"
												align="center"
												color="textPrimary"
												gutterBottom
											>
												<FontAwesomeIcon
													className={this.props.classes.icon}
													component="h1"
													variant="h1"
													align="center"
													icon={faIdCard}
												/>
												<br />
												My Profile
											</Typography>
										</CardContent>
									</Card>
								</Link>
							</Grid>
						) : (
							<span />
						)}
					</Grid>
				</Fade>
			</React.Fragment>
		);
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
