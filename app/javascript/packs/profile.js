import React from 'react';
import WebpackerReact from 'webpacker-react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import reqwest from 'reqwest';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

class Profile extends React.Component { 
    
    constructor(props){
        super(props);
        this.state= {
            name: this.props.name,
            last_name: this.props.last_name,
            address: this.props.address,
            address_details: this.props.address_details,
            city: "Rosario",
        }
        this.editPost = this.editPost.bind(this);
    }
    
    componentDidMount(){
        this.searchMap();
    }
    editPost(e){
        e.preventDefault();

        reqwest({
            url: '/profiles/'+ this.state.id,
            method: 'PATCH',
            data: { 
                id: this.state.id, authenticity_token: window.tkS2331458344q,
                user: {
                    name: this.state.name,
                    last_name : this.state.last_name,
                    address : this.state.address,
                    address_details : this.state.address_details,
                    city : this.state.city,
                },
            headers: { 'Content-Type': 'application/json' },
            },
        }).then((data)=>{console.log("Correcto."); window.location.reload();}).catch(err=> {  this.setState({error: err, open:true})});
    }
    
    syncField(evento, campo){
        let element = evento.target;
        let value = element.value;

        let jS = {};
        jS[campo] = value;

        this.setState(jS);

    }
    searchMap(){

        var quer=this.state.address + ", " + this.state.city + ", Argentina"
        reqwest(
            { url: 'https://nominatim.openstreetmap.org/search',
            method: 'GET',
            data: {
                q: quer,
                format: 'json'
            }
        }
        ).then(data=>{this.downloadMap(data); console.log(this.state)}).catch(err=> {  this.setState({error: err, open:true})});

    }
    downloadMap(data){
         
        // Comprobar cantidad de resultados disponibles, y dar a elegir al usuario.
        // Por elmo se mostrará el mapa del lugar 0 (mejor coincidencia)
        let coord = {};
        coord= data['0']['boundingbox'];
        
        let coordinates = data['0'].lon + "," + data['0'].lat;
        
        reqwest({
            url: 'http://api.tomtom.com/map/1/staticimage',
            method: 'GET',
            data: {
                center: coordinates,
                format: 'jpg',
                // width: '350',
                // height: '320',
                // markers: 'color: blue label: AQUÍ',
                key: '6fEWMnnxWPDJ3BpQGKffuMUlyQiBlUlu',
                // bbox: coord,
                zoom: '15',
                // view: 'AR',
            },
            
        }).then(data=>{ this.setState({mapa: data.responseURL});}).catch(err=> {  this.setState({error: err, open:true})});
    }
    render(){
        return(
        <Grid container alignContent="center" justify="center">
            <Grid item xs={12} lg={4} md={6}>
                <Snackbar
                    open={ this.state.open}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                    autoHideDuration={3000}
                >
                    
                    <SnackbarContent
                        classes={{root: 'background-color: red'}}
                        aria-describedby="client-snackbar"
                        message= { this.state.error }
                    /></Snackbar>
                <Card><CardContent>
                    <form onSubmit={this.editPost}>
                        <div className="field-profile">
                            <h2>Tu perfil</h2>
                        </div>
                        <div className="field-profile">
                        <TextField onChange={ (e)=> this.syncField(e, 'name') } required
                            label = "Tu nombre"  
                            variant="outlined"
                            margin="dense"
                            value = { this.state.name }
                            className="text-profile"
                        /></div>
                        <div className="field-profile">
                        <TextField onChange={ (e)=> this.syncField(e, 'last_name') } required
                            label = "Tu apellido"
                            variant="outlined"
                            margin="dense"    
                            value = { this.state.last_name }
                            className="text-profile"
                        /></div>
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
                        <TextField onChange={ (e)=> this.syncField(e, 'address') } required onBlur={ (a)=>{this.searchMap(a)}}
                            label = "Tu dirección"
                            variant="outlined"
                            margin="dense"    
                            value = { this.state.address }
                            className="text-profile"
                        /></div>
                        
                        <div className="field-profile">
                        <TextField onChange={ (e)=> this.syncField(e, 'address_details') }
                            label = "Piso, número y otros datos..."
                            variant="outlined"
                            margin="dense"    
                            value = { this.state.address_details }
                            className="text-profile"
                        /></div>
                        <div className="field-profile">
                            <Button variant="contained" color="primary" type="submit" className="button-profile"> Confirmar</Button>
                        </div>
                        
                    </form>
                </CardContent>
                </Card>
            </Grid>
                <Grid item xs={12} lg={4} md={6}>
                    <Card>
                    <CardContent>

                        <div className="field-profile"><h3>Tu ubicación</h3></div>
                            <div className="mapContainer"><div className="mapMarker">&#x25B2;</div><img src= {this.state.mapa} className="mapa"></img></div>
                    </CardContent>
                    </Card>
            </Grid>
        </Grid>);
    }
}

WebpackerReact.setup({Profile});

/*

Este componente mostrará los datos guardados en la BD para el current_user
relacionados con su perfil y le permitirá modificarlos.
Cuando cambie la dirección, se le mostrará el mapa, obtenido de:  
https://nominatim.openstreetmap.org/search?q=#{VARIABLECONLOQUEPUSOELUSER+,ROSARIO}&format=json

*/