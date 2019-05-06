import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faBook, faDizzy, faUserPlus, faVideo, faCubes } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

function mapStateToProps(state){
	return {
		user: state.user
	}
}

const styles = theme => ({
	mainGrid: {
		marginTop: "64px",
		margin: "auto"
	},

	cardGrid: {
		
	},

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

	componentDidMount() {
		console.log(this.props.user);
		console.log("DASHBOARD ROLE", this.props.user.role);
	}

	render() {
		return (
			<div>
				<AppBar position="static" className={this.props.classes.appBar}>
					<Toolbar>
						<Typography variant="h6" color="inherit" align="center" noWrap>
							Dashboard
						</Typography>
					</Toolbar>
				</AppBar>
				<Grid
					className={this.props.classes.mainGrid}
					container
					spacing={16}
					justify="left"
					alignContent="left"
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
				) : (<span></span>) }
					

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
											icon={faDizzy}
										/>
										<br />
										Teachers
									</Typography>
								</CardContent>
							</Card>
						</Link>
					</Grid>
				): (<span></span>)}

				{this.props.user.role === "admin" ? (
					<Grid className={this.props.classes.cardGrid} item sm={12} md={4} lg={3}>
						<Link to="/users/form" className={this.props.classes.link}>
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
											icon={faUserPlus}
										/>
										<br />
										Add User
									</Typography>
								</CardContent>
							</Card>
						</Link>
					</Grid>
				): (<span></span>)}
					

				{this.props.user.role==="teacher" ? (
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
											icon={faCubes}
										/>
										<br />
										Tests
									</Typography>
								</CardContent>
							</Card>
						</Link>
					</Grid>

				) : (<span></span>)}
					
				{this.props.user  ? (
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
				) : (<span></span>)}

				{this.props.user  ? (
					<Grid className={this.props.classes.cardGrid} item sm={12} md={4} lg={3}>
						<Link to="/activities/" className={this.props.classes.link}>
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
										Activities
									</Typography>
								</CardContent>
							</Card>
						</Link>
					</Grid>
				) : (<span></span>)}


				{this.props.user.role === "student"  ? (
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
											icon={faUserGraduate}
										/>
										<br />
										My Profile
									</Typography>
								</CardContent>
							</Card>
						</Link>
					</Grid>
				) : (<span></span>)}
				</Grid>

			
			</div>)
			
	}	
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(Dashboard));
