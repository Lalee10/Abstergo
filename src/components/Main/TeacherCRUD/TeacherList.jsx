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
import axios from "axios";

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

class TeacherList extends Component {
    state = {teachers: null}

    async componentDidMount() {
        const teachers = (await axios.get("/api/teacher")).data;
        this.setState({teachers: teachers});
        console.log(teachers);
    }

    renderTeachers = () => {
        if (!this.state.teachers){
            return (<div></div>)
        }
        return this.state.teachers.map((teacher, index)=>{
            return (
                <Fade in={true} timeout={500*(index+1)}>
                    <Link to={"/api/teacher/"+teacher.teacherID}>
                        <ListItem alignItems="flex-start" key={teacher.teacherID}>

                                <ListItemAvatar>
                                    <Avatar src="/elliot.jpg" />
                                </ListItemAvatar>
                        
                                <ListItemText
                                primary={teacher.firstName +  " " + teacher.lastName}
                                />
                            <Button className={this.props.classes.button} variant="contained" color="primary"> View </Button>
                            
                        </ListItem>
                    </Link>
                </Fade>
            )
        });
    }

    render() {
        return (
            <div>

                <AppBar position="static" className={this.props.classes.appBar}>
                    <Toolbar>
                    <Typography variant="h6" color="inherit" align="center" noWrap>
                        View Teachers
                    </Typography>
                    </Toolbar>
                </AppBar>

                <Grid container spacing={16} justify="center" alignContent="center" className={this.props.classes.mainGrid}>
                    
                    <List className={this.props.classes.root}>
                        
                        {this.renderTeachers()}
                    
                    </List>
                
                </Grid>
                
            </div>
        );
    }
}

TeacherList.propTypes = {
	classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(TeacherList);