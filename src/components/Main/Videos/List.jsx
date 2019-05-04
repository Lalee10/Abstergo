import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Card } from '@material-ui/core';
import { CardContent } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import PropTypes from 'prop-types';

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
           
            <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                <Card>
                    <CardMedia className={this.props.cardMedia}>
                        <img src="/elliot.jpg" style={imgStyle}></img>
                    </CardMedia>
                    <CardContent>
                        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                            Video Title
                        </Typography>
                    </CardContent>
                    </Card>
            </Grid>

            
            <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                <Card>
                    <CardContent>
                        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                            Video Title
                        </Typography>
                    </CardContent>
                    </Card>
            </Grid>

            <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                <Card>
                    <CardContent>
                        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                            Video Title
                        </Typography>
                    </CardContent>
                    </Card>
            </Grid>

            <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                <Card>
                    <CardContent>
                        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                            Video Title
                        </Typography>
                    </CardContent>
                    </Card>
            </Grid>

            <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                <Card>
                    <CardContent>
                        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                            Video Title
                        </Typography>
                    </CardContent>
                    </Card>
            </Grid>

            <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                <Card>
                    <CardContent>
                        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                            Video Title
                        </Typography>
                    </CardContent>
                    </Card>
            </Grid>

            <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                <Card>
                    <CardContent>
                        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                            Video Title
                        </Typography>
                    </CardContent>
                    </Card>
            </Grid>

            <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                <Card>
                    <CardContent>
                        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                            Video Title
                        </Typography>
                    </CardContent>
                    </Card>
            </Grid>
        </Grid>
      </div>
    );
  }
}

VideoList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VideoList);