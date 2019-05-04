import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { CardContent } from "@material-ui/core";
import PropTypes from 'prop-types';

const styles = theme => ({
    mainGrid: {
		marginTop: "64px"
    },
    
    button: {
        boxSize: "border-box",
        width: "24px",
        marginTop: "16px",
        marginRight: "64px",
    },

    buttonGrid: {
            textAlign: "center"
    },
    cardMedia: {
        paddingTop: '25%', // 16:9
      },

    infoCard: {
        transform: "rotate(-1deg)"
    },

    appBar: {
		alignItems: 'center',
	},
})

const imgStyle = {width: 256, height: 256, borderRadius: "20%", transform: "rotate(5deg)"};

class StudentView extends Component {
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
                <Grid container spacing={16}  justify="center" alignContent="center" alignItems="center" className={this.props.classes.mainGrid}>
                    
                    <Grid item  xs={12} sm={10} lg = {3} justify="center" alignContent="center">
                        <img src="/elliot.jpg" style ={imgStyle}></img>
                    </Grid> 
                    
                    <Grid item  xs={12} sm={10} lg = {7}>
                        <Grid container  spacing={16}  justify="center" alignContent="center" alignItems="center">
                            
                            <Grid item xs={12} lg = {12}>
                                <Card className={this.props.classes.infoCard}>
                                
                                    <CardContent>
                                        
                                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                            Student Name
                                        </Typography>
                                        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                                            Grade: 5
                                        </Typography>
                                        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                                            Age: 10 
                                        </Typography>
                                        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                                            abc: xyz
                                        </Typography>
                                        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                                            def: uvw 
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item className={this.props.classes.buttonGrid} item xs={12} sm={10} lg = {10} alignItems="center" alignContent="center">
                                <Button className={this.props.classes.button} variant = "contained" color="primary"> Edit </Button>
                                <Button className={this.props.classes.button} variant="contained" color="secondary"> Delete </Button>
                             </Grid>
                         </Grid>
                    </Grid>

                </Grid>


                
                
            </div>
        );
    }
}

StudentView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentView);