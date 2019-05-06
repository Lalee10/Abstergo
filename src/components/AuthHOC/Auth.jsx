import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography";
import { stat } from 'fs';

function mapStateToProps(state) {
    return {
        user: state.user
    };
}


export default function AuthFunction(Component, role, user) {

   

    class Auth extends Component {
        


        renderComponent = () => {
            
            // if (!user)  {
            //     this.props.history.push("/login")
            //     return(
            //     <Typography variant ="h6" align="center" >
            //         You must be logged in to access this page.
            //     </Typography>);
            // }
    
            // if (role){
            //     if (!user.role === role) {
            //         return(
            //             <Typography variant ="h6" align="center" >
            //                 You do not have privilege to access this page.
            //             </Typography>);
            //     }
            // }
            
    
            return (
                <Component {...this.props}  />
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
    
    

