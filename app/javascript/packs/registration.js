import React from 'react';
import WebpackerReact from 'webpacker-react';
import { Login } from '../components/registration/login'; // SIN DEFAULT, CON LLAVES
import { SignUp } from '../components/registration/signup';
import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';

class Registration extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        showLogin: true
      }
      this.toggle = this.toggle.bind(this);
    }

    toggle(d){
      d.preventDefault();
      this.setState({showLogin: !this.state.showLogin});
    }
    
    render(){
        //Salida del component
        return (<CssBaseline>
          <Grid container spacing={16} justify="center" alignItems="center" className="full-page-height-vh">
            <Grid item xs={11} sm={6} >

              { this.state.showLogin ? <Login toggle={this.toggle} /> : <SignUp toggle={this.toggle} /> }

            </Grid>
          </Grid>
        </CssBaseline>);
          
    }
}

WebpackerReact.setup({Registration});