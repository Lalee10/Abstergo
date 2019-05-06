import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { CardContent, Paper } from "@material-ui/core";
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarker, faUser } from "@fortawesome/free-solid-svg-icons";

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
    
    marginBottom: {
        marginBottom: "16px"
    },

    leftMargin: {
        marginLeft: "48px"
    }
   
})

const imgStyle = {margin: "auto", width: 256, height: 256, borderRadius: "20%", transform: "rotate(5deg)"};

class StudentView extends Component {

    state = {student: null, dialogOpen: false}

    openModal = () => {
        this.setState({dialogOpen: true});
    }

    closeModal = () => {
        this.setState({dialogOpen: false});
    }

    handleDelete = async () => {
        await axios.delete("/api/student/" + this.state.student.studentID, {data: {data: {studentID: this.state.student.studentID}}});
        this.props.history.push("/students/view")
    }

    async componentDidMount(){
        const student = (await axios.get("/api/student/" + this.props.match.params.id)).data;
        this.setState({student: student});
    }

    renderStudent = () => {
        if (!this.state.student){
            return <div></div>
        }

        return (
            <div>
            <Grid container spacing={16}  justify="center" alignContent="center" alignItems="center" className={this.props.classes.mainGrid}>
                    
                    <Grid item className={this.props.classes.imageGrid}  xs={12} sm={12} lg = {4} justify="center" alignContent="center">
                        <img src={this.state.student.imagePath} style ={imgStyle}></img>
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
                                <Button  className={this.props.classes.button} variant = "contained" color="primary"> Edit </Button>
                                <Button onClick={this.openModal} className={this.props.classes.button} variant="contained" color="secondary"> Delete </Button>
                             </Grid>
                         </Grid>
                    </Grid>
                </Grid>
                    <br />
                    <div className={this.props.classes.marginBottom}></div>

             
                    
                    <Grid justify="space-between" container spacing ={24} className={this.props.classes.leftMargin}>
                        <Grid item lg = {3} sm = {6} xs={12}>
                        <FontAwesomeIcon icon = {faMarker}/> Marks
                        <List >
                            {this.state.student.tests.map(test=>{
                                return (
                                    <Paper>
                                        <ListItem divider className={this.props.classes.testCard}>
                                            <ListItemText 
                                                primary={test.testName}
                                                secondary= {  "Marks:    " + test.StudentTest.obtainedMarks +"/" + test.maxMarks }
                                            />
                                        </ListItem>
                                    </Paper>
                                );
                            }) }
                        </List>
                        </Grid>

                        <Grid item lg = {3} sm = {6} xs={12}>
                            <FontAwesomeIcon icon = {faUser}/> Teachers

                            <List >
                            {this.state.student.teachers.map(teacher=>{
                                return (
                                    <Paper>
                                        <ListItem divider className={this.props.classes.testCard}>
                                            <ListItemText 
                                                primary={teacher.firstName + " " + teacher.lastName}
                                            />
                                        </ListItem>
                                    </Paper>
                                );
                            }) }
                        </List>
                        </Grid>

                    </Grid>
        </div>
                

                
        );
    }

    render() {
        return (
            <div>
                <Dialog
            open={this.state.dialogOpen}
            onClose={this.closeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                    <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                            {this.state.student ? `Are you sure you want to delete ${this.state.student.firstName}  ${this.state.student.lastName}?` : ""}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.handleDelete} color="primary">
                        Delete
                        </Button>
                    </DialogActions>
             </Dialog>

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