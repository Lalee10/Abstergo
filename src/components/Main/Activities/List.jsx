import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from "@material-ui/core/Button"
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import { Card } from '@material-ui/core';
import { CardContent } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import axios from "axios";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const styles = theme => ({
	mainGrid: {
        marginTop: "64px",
        paddingRight: "50px",
        marginLeft: "16px"
	},

	appBar: {
		alignItems: 'center',
	},

	link: {
		textDecoration: "none"
    },

    cardMedia: {
        paddingTop: "25%",
        height: 0,
        textAlign: "center"
    }

});

const imgStyle = {width: "100%", height: 200}



class ActivityList extends Component {

    handleDelete = async (id) => {
        let response = await axios.delete("/api/activity", {data: {data: {activityID: id}}});
        console.log(response);
        if (response.status === 200){
            console.log("GOT 200 RESPONSE")
            window.location.reload();
        }
    }

    state = {
        activities: null
    }

    async componentDidMount() {
        const activities = (await axios.get("/api/activity")).data;
        console.log("GOT RESPONSE", activities)
        this.setState({activities: activities});

    }


    renderActivityList = () => {
        if (!this.state.activities){
            return <div></div>
        }
        return (
            this.state.activities.map((activity, i)=>{ return(
        <Fade in={true} timeout={500*(i+1)}>
        <Grid style={{textAlign:"center"}} item xs = {12} sm = {6} md = {4} lg = {3} key={activity.activityID}>
           
                <Card onClick={()=> window.open(window.location.href.replace("/activities", "") + activity.path, "_blank")}>>
  
                    <CardContent>
                        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                            {activity.name}
                        </Typography>
                    </CardContent>
                </Card>

            {this.props.user.role==="admin"  ? (<Button  onClick={()=> this.handleDelete(activity.activityID)} style={{marginTop:"8px"}} variant="contained" color="secondary">Delete</Button>) : <div></div>}
        </Grid>
        </Fade>)
            })
        )
    }

  render() {
    return (
      <div>

    <AppBar position="static" className={this.props.classes.appBar}>
        <Toolbar>
            <Typography variant="h6" color="inherit" align="center" noWrap>
                Activitys 
            </Typography>
        </Toolbar>
    </AppBar>
        

        <Grid container spacing = {16} justify="left" alignContent="left" className={this.props.classes.mainGrid}>
           {this.props.user.role === "teacher" ? (<Grid item lg={12} style={{textAlign:"center"}}>
           <Link to ="/activity/upload" style={{textDecoration: "none"}}>
                   <Button variant="contained" color="primary">
                       <FontAwesomeIcon icon={faPlus} style={{marginRight: "8px"}}/>
                   
                       Add New Activity
                   </Button>
               </Link>
          </Grid>) : (<span></span>)}
            
            {this.renderActivityList()}
        </Grid>
      </div>
    );
  }
}

ActivityList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default (withStyles(styles)(ActivityList));