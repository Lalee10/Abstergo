import React from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { CardContent } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserPlus, faUsers} from '@fortawesome/free-solid-svg-icons';



const styles = theme => ({
	mainGrid: {
		position:"absolute",
		top: "20%",
	},

	gridItem: {
		marginBottom: "24px",
		
	},

	card: {
		cursor: "pointer",
		transition: "1s",
		boxShadow: "3px 3px #888888",
		'&:hover': {
			boxShadow: "10px 12px #888888",
			transform: "translate(0px,-20px) rotate(2deg)"
		  }
	},

	appBar: {
		alignItems: "center"
	},

	icon: {
		fontSize: "125%",
		marginBottom: "0.45em",
	},
});

class Student extends React.Component {


	render() {
		return (
			<div>
				<AppBar position="static" className={this.props.classes.appBar}>
				<Toolbar>
				<Typography variant="h6" color="inherit" align="center" noWrap>
					Students
				</Typography>
				</Toolbar>
			</AppBar>

			<Grid className={this.props.classes.mainGrid} container spacing={16} justify="center" alignContent="center">

			<Fade in = {true} timeout={2000}>
			<Grid item sm={7} lg={7} className = {this.props.classes.gridItem}>
				<Card className={this.props.classes.card}>
					<CardContent>
						<Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
							<FontAwesomeIcon className={this.props.classes.icon}  component="h1" variant="h1" align="center" icon={faUserPlus}/>
							<br />
							Add Student
						</Typography>
					</CardContent>
				</Card>
			</Grid>
			</Fade>

			<Fade in = {true} timeout={4000}>
				<Grid item sm={7} lg={7} className = {this.props.classes.gridItem}>
					<Card className={this.props.classes.card}>
						<CardContent>
						<Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
							<FontAwesomeIcon className={this.props.classes.icon}  component="h1" variant="h1" align="center" icon={faUsers}/>
							<br />
							View Students
						</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Fade>
		
		</Grid>
			
			</div>
			

			);
	}
}

Student.propTypes = {
	classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Student);
