import React from "react"
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGraduate, faBook, faDizzy  } from '@fortawesome/free-solid-svg-icons';


const styles = theme => ({
	mainGrid: {
		position: "absolute",
		top: "20%"
	},

	cardGrid: {
		height: "100%"
	},

	card: {
		height: "100%",
		transition: "1s",
		boxShadow: "3px 3px #888888",
		cursor: "pointer",
		'&:hover': {
			boxShadow: "10px 12px #888888",
			transform: "translate(0px,-20px) rotate(2deg)"
		  }
	},

	icon: {
		fontSize: "250%",
		marginBottom: "0.45em",
	},

	appBar: {
		alignItems: 'center',
	},

	link: {
		textDecoration: "none"
	}
});


class Dashboard extends React.Component {

	constructor(props) {
		super(props);
	  }



	render() {

		return (<div>
			<AppBar position="static" className={this.props.classes.appBar}>
				<Toolbar>
				<Typography variant="h6" color="inherit" align="center" noWrap>
					Dashboard
				</Typography>
				</Toolbar>
			</AppBar>
			<Grid className={this.props.classes.mainGrid} container spacing={16} justify="center" alignContent="center">
				
				
				<Grid className={this.props.classes.cardGrid} item sm={12} md = {4} lg={3}>
					<Link to="/students" className={this.props.classes.link}>
					<Card className = {this.props.classes.card}>
						<CardContent>
							<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
							<FontAwesomeIcon className={this.props.classes.icon}  component="h1" variant="h1" align="center" icon={faUserGraduate}/>
								<br />	
								Students
							</Typography>
						</CardContent>
					</Card>
					</Link>
				</Grid>

				<Grid className={this.props.classes.cardGrid} item sm={12} md = {4} lg={3}>
					<Card className = {this.props.classes.card}>
						<CardContent>
						<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
						
						<FontAwesomeIcon className={this.props.classes.icon}  component="h1" variant="h1" align="center" icon={faDizzy}/>
							<br />
							Teachers
						</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid className={this.props.classes.cardGrid} item sm={12} md = {4} lg={3}>
					<Card className = {this.props.classes.card}>
						<CardContent>
						<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
							<FontAwesomeIcon className={this.props.classes.icon}  component="h1" variant="h1" align="center" icon={faBook}/>
							<br />	
							Tests
						</Typography>
						</CardContent>
					</Card>
				</Grid>
					
			</Grid>
			
			
			</div>)
			
	}	
}


Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Dashboard);
	


