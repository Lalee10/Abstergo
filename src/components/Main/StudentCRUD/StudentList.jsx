import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserPlus, faUsers} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const styles = theme => ({
	mainGrid: {
		marginTop: "64px"
	},

	appBar: {
		alignItems: 'center',
	},

	link: {
		textDecoration: "none"
    },
    
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      inline: {
        display: 'inline',
      },
      button: {
          position: "relative",
          top: "6px"
      }
});

class StudentList extends Component {
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

                <Grid container spacing={16} justify="center" alignContent="center" className={this.props.classes.mainGrid}>
                    
                    <List className={this.props.classes.root}>
                        <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar src="/elliot.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                        primary="John Doe"
                        secondary={
                            <React.Fragment>
                            <Typography component="span" className={this.props.classes.inline} color="textPrimary">
                                Grade: 5
                            </Typography>
                            </React.Fragment>
                        }
                        />
                    <Button className={this.props.classes.button} variant="contained" color="primary"> View </Button>
                        
                    </ListItem>
                    
                    </List>
                
                </Grid>
                
            </div>
        );
    }
}

StudentList.propTypes = {
	classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(StudentList);