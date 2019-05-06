import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { CardContent } from "@material-ui/core";
import PropTypes from 'prop-types';
import axios from "axios";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChartBar} from '@fortawesome/free-solid-svg-icons';

function compare( a, b ) {
    if ( a.obtainedMarks< b.obtainedMarks){
      return -1;
    }
    if ( a.obtainedMarks> b.obtainedMarks){
      return 1;
    }
    return 0;
  }

const styles = theme => ({
    mainGrid: {
        marginTop: "64px",
        margin:"auto",
       width: "60%"
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


    infoCard: {
        transform: "rotate(-0.5deg)"
    },

    appBar: {
		alignItems: 'center',
    },
    
    graphGrid: {
        marginTop: "24px"
    }
})





class TestView extends Component {
    state = {test: null, showGraph: false}

    showGraph = () => {
        this.setState({showGraph: true});
    }

    renderTest = () => {
        if (!this.state.test){
            return <div></div>
        }
        else {
            return (
                <Grid container spacing={16}  justify="center" alignContent="center" alignItems="center" className={this.props.classes.mainGrid}>
                
                    <Grid item  xs={12} sm={12} lg = {12}>
                        <Grid container  spacing={16}  justify="center" alignContent="center" alignItems="center">
                            
                            <Grid item xs={12} lg = {12}>
                                <Card className={this.props.classes.infoCard}>
                                
                                    <CardContent>
                                        
                                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                            {this.state.test.testName}
                                        </Typography>
                                        <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
                                            Topic : {this.state.test.topic}
                                        </Typography>
                                        <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
                                            Max Marks: {this.state.test.maxMarks}
                                        </Typography>
                                        <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
                                            Number of Students: {this.state.test.students.length}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item className={this.props.classes.buttonGrid} item xs={12} sm={10} lg = {10}>
                                <Button className={this.props.classes.button} variant = "contained" color="primary"> Edit </Button>
                                <Button className={this.props.classes.button} variant="contained" color="secondary"> Delete </Button>
                            </Grid>

                        </Grid>
                    </Grid>

                </Grid>
            );
        }
    }

    renderChart = () => {
        if (!this.state.test){
            return <div></div>
        }
        const studentArray = this.state.test.students.map((student)=>{
            let newStudent = student;
            newStudent.obtainedMarks = student.StudentTest.obtainedMarks;
            return newStudent;
        })
        const studentMarks = studentArray.sort(compare);
        console.log("STUDENT MARKS")
        console.log(studentMarks)
        return (
            <Grid container className={this.props.classes.graphGrid} spacing={16} justify="center" alignContent="center">
                {!this.state.showGraph ? (
                <Button variant="contained" color="secondary" onClick = {this.showGraph}>
                    
                    <Typography variant="h2">
                        <FontAwesomeIcon icon={faChartBar} />
                    </Typography>
                    <br></br>
                    <Typography variant="h6">
                        
                    </Typography>
                    
                </Button>) : (
            <Fade in={true} timeout={1000}>
                    
                <LineChart width={600} height={300} data={studentMarks}>
                    <XAxis dataKey="firstName"/>
                    <YAxis dataKey="obtainedMarks"/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Line isAnimationActive={false} type="monotone" dataKey="obtainedMarks" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
                
            </Fade>
            
            
            ) }
                
            </Grid>
        );
    }

    async componentDidMount(){
        const test = (await axios.get("/api/test/"+this.props.match.params.id)).data;
        this.setState({test:test});
    }
    render() {
        return (
            <React.Fragment>
                <AppBar position="static" className={this.props.classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit" align="center" noWrap>
                                {this.state.test ? this.state.test.testName : "Loading..."}
                            </Typography>
                        </Toolbar>
                </AppBar>

                {this.renderTest()}

                {this.renderChart()}
                
            </React.Fragment>
        );
    }
}

TestView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TestView);