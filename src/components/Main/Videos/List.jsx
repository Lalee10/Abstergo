import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Card } from '@material-ui/core';
import { CardContent } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import axios from "axios";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"

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

class VideoList extends Component {

    state = {
        videos: null
    }

    async componentDidMount() {
        const videos = (await axios.get("/api/videos")).data;
        console.log("GOT RESPONSE", videos)
        this.setState({videos: videos});

    }


    renderVideoList = () => {
        if (!this.state.videos){
            return <div></div>
        }
        return (
            this.state.videos.map(video=>{ return(
            <Grid item xs = {12} sm = {6} md = {4} lg = {3} key={video.videoID}>
                <Link to={"/videos/"+video.videoID} className = {this.props.classes.link}> 
                <Card>
                    <CardMedia className={this.props.cardMedia}>
                        <img src={video.thumbnail} style={imgStyle}></img>
                    </CardMedia>
                    <CardContent>
                        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                            {video.name}
                        </Typography>
                    </CardContent>
                    </Card>
                </Link>
            </Grid>)
            })
        )
    }

  render() {
    return (
      <div>

    <AppBar position="static" className={this.props.classes.appBar}>
        <Toolbar>
            <Typography variant="h6" color="inherit" align="center" noWrap>
                Videos
            </Typography>
        </Toolbar>
    </AppBar>

        <Grid container spacing = {16} justify="left" alignContent="left" className={this.props.classes.mainGrid}>
           
            {this.renderVideoList()}
        </Grid>
      </div>
    );
  }
}

VideoList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VideoList);