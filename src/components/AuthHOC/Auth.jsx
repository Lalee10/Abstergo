import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography";
import { stat } from 'fs';




export default function AuthFunction(Component, role, context) {

   

    class Auth extends Component {
        


        renderComponent = () => {
            
            if (! context.state.user)  {
                this.props.history.push("/login")
                return(
                <Typography variant ="h6" align="center" >
                    You must be logged in to access this page.
                </Typography>);
            }
    
            if (role){
                if (!context.state.user.role === role) {
                    return(
                        <Typography variant ="h6" align="center" >
                            You do not have privilege to access this page.
                        </Typography>);
                }
            }
            
        
            return (
                <Component user={context.state.user} />
            )
    
        }
        
        render(){
            return (
                
                <div>
                {this.renderComponent()}
                </div>
            );
        }
            
        
    }

    return Auth

}
    
    

