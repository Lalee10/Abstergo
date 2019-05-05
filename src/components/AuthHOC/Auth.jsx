import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import { stat } from 'fs';

function mapStateToProps(state) {
    return {
        user: state.user
    };
}


export default function Auth(Component, role) {

    renderComponent = (props) => {
        if (!props.user)  {
            return(
            <Typography variant ="h6" align="center" >
                You must be logged in to access this page.
            </Typography>);
        }

        if (!props.user.role === role) {
            return(
                <Typography variant ="h6" align="center" >
                    You do not have privilege to access this page.
                </Typography>);
        }

        return (
            <Component />
        )

    }

    Auth = (props) =>{
        
            return (<div>
                {this.renderComponent(props)};
                </div>
            );
        }
        return connect(
            mapStateToProps,
        )(Auth);
    }
    
    

