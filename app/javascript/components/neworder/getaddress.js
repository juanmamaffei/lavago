import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import reqwest from 'reqwest';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';


import store from '../../store';

class GetAddress extends React.Component { 
    constructor(props){
        super(props);
        this.state = { 
            city: "",
            address: this.props.address,
            test_address: "Estado default",
        }

        //Testeando el flujo de trabajo con Redux
        store.subscribe(()=>{
            this.setState({ test_address : store.getState().def_address })
        })
    
    }
    syncField(evento, campo){
            let element = evento.target;
            let value = element.value;

            let jS = {};
            jS[campo] = value;

            this.setState(jS);
            // console.log(store.getState());
    }
    defAddress(def_address){
        store.dispatch({type: 'UPDATE_ADDRESS', def_address});
        console.log(store.getState());
    }
    render(){
            return(
            <Grid container alignContent="center" justify="center">
                <h1>{this.state.test_address}</h1>
                <Grid item xs={12} lg={4} md={6}>
                    <Card><CardContent>
                    <form onSubmit={this.editPost}>
                    <div className="field-profile">
                        <Select onChange={ (e)=> this.syncField(e, 'city') } required
                            label = "Ciudad" 
                            native
                            input={
                                <OutlinedInput
                                  name="city"
                                  labelWidth={0}                                  
                                />}
                            margin="dense"   
                            value = { this.state.city }
                            className="text-profile"
                        ><option value="Rosario">Rosario</option></Select></div>
                    <div className="field-profile">
                    <TextField 
                        onChange={ (e)=> this.syncField(e, 'address') }
                        onBlur={()=>this.defAddress(this.state.address)}
                        required
                        label = "Tu dirección"
                        variant="outlined"
                        margin="dense"    
                        value = { this.state.address }
                        className="text-profile"
                    /></div>
                    <div className="field-profile">
                            <Button variant="contained" color="primary" type="submit" className="button-profile"> Siguiente</Button>
                        </div>
                    </form>
                    </CardContent>
                    </Card>
                </Grid>
            </Grid>);
    }
}

export default GetAddress;