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
import axios from "axios";

const styles = theme => ({
    mainGrid: {
        marginTop: "64px",
        margin: "auto"
    },
    
    button: {
        boxSize: "border-box",
        width: "24px",
        marginTop: "16px",
        marginRight: "64px",
    },

    imageGrid: {
        textAlign: "center"
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

const imgStyle = {margin: "auto", width: 256, height: 256, borderRadius: "20%", transform: "rotate(5deg)"};

class StudentView extends Component {

    state = {student: null}

    async componentDidMount(){
        const student = (await axios.get("/api/student/" + this.props.match.params.id)).data;
        this.setState({student: student});
    }

    renderStudent = () => {
        if (!this.state.student){
            return <div></div>
        }

        return (
            <Grid container spacing={16}  justify="center" alignContent="center" alignItems="center" className={this.props.classes.mainGrid}>
                    
                    <Grid item className={this.props.classes.imageGrid}  xs={12} sm={12} lg = {4} justify="center" alignContent="center">
                        <img src="/elliot.jpg" style ={imgStyle}></img>
                    </Grid> 
                    
                    <Grid item  xs={12} sm={12} lg = {7}>
                        <Grid container  spacing={16}  justify="center" alignContent="center" alignItems="center">
                            
                            <Grid item xs={12} lg = {12}>
                                <Card className={this.props.classes.infoCard}>
                                
                                    <CardContent>
                                        
                                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                            {this.state.student.firstName + " " + this.state.student.lastName}
                                        </Typography>
                                        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                                            Grade: {this.state.student.grade}
                                        </Typography>
                                        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                                            Age: {this.state.student.age}
                                        </Typography>
                                        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                                            Gender: {this.state.student.gender}
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
        );
    }

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
                
                {this.renderStudent()}

                
                
            </div>
        );
    }
}

StudentView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentView);