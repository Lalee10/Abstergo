import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types';
import axios from "axios";

const styles = theme => ({
    mainGrid: {
        margin: "64px auto",
        width: "90%"
    },

    appBar: {
		alignItems: 'center',
    },

    descriptionHeading: {
        marginTop: "16px"
    }
    

})

class ViewVideo extends Component {

    state = {
        video: null
    }

    async componentDidMount(){
        const videoData = (await (axios.get("/api/videos/" + this.props.match.params.id))).data
        this.setState({video: videoData});
        
    }

    renderVideo = () => {
        if (!this.state.video){
            return <div></div>
        }
        return (
        <Grid className={this.props.classes.mainGrid} container spacing={16} justify="center" alignContent="center">
                   
            <ReactPlayer url={this.state.video.path} playing controls/>
            <br />

            <Grid className={this.props.classes.descriptionHeading} item container justify="center" alignItems="center" xs={12} lg ={12}>
                Description:
            </Grid>

            <Grid className={this.props.classes.descriptionHeading} item container justify="center" alignItems="center" xs={12} lg ={12}>
                {this.state.video.description}
            </Grid>
            
                
        </Grid>
        );
    }

    render() {
        return (

            

            <div>
                <AppBar position="static" className={this.props.classes.appBar}>
                            <Toolbar>
                            <Typography variant="h6" color="inherit" align="center" noWrap>
                                {this.state.video ? this.state.video.name : "Loading..."}
                            </Typography>
                            </Toolbar>
                </AppBar>
    
                {this.renderVideo()}

                
            </div>
        );
    }
}

ViewVideo.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewVideo);