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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

class TeacherView extends Component {

    state = {teacher: null, dialogOpen: false}

    openModal = () => {
        this.setState({dialogOpen: true});
    }

    closeModal = () => {
        this.setState({dialogOpen: false});
    }

    handleDelete = async () => {
        await axios.delete("/api/teacher/" + this.state.teacher.teacherID, {data: {data: {teacherID: this.state.teacher.teacherID}}});
        this.props.history.push("/teachers/view")
    }

    async componentDidMount(){
        const teacher = (await axios.get("/api/teacher/" + this.props.match.params.id)).data;
        this.setState({teacher: teacher});
    }

    renderTeacher = () => {
        if (!this.state.teacher){
            return <div></div>
        }

        return (
            <Grid container spacing={16}  justify="center" alignContent="center" alignItems="center" className={this.props.classes.mainGrid}>
                    
                    <Grid item className={this.props.classes.imageGrid}  xs={12} sm={12} lg = {4} justify="center" alignContent="center">
                        <img src={this.state.teacher.imagePath} style ={imgStyle}></img>
                    </Grid> 
                    
                    <Grid item  xs={12} sm={12} lg = {7}>
                        <Grid container  spacing={16}  justify="center" alignContent="center" alignItems="center">
                            
                            <Grid item xs={12} lg = {12}>
                                <Card className={this.props.classes.infoCard}>
                                
                                    <CardContent>
                                        
                                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                            {this.state.teacher.firstName + " " + this.state.teacher.lastName}
                                        </Typography>
                                        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                                            Gender: {this.state.teacher.gender}
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

                            {this.state.teacher ? `Are you sure you want to delete ${this.state.teacher.firstName}  ${this.state.teacher.lastName}?` : ""}
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
                            View Teachers
                        </Typography>
                        </Toolbar>
                </AppBar>
                
                {this.renderTeacher()}

                
                
            </div>
        );
    }
}

TeacherView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeacherView);