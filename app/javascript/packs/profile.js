import React from 'react';
import WebpackerReact from 'webpacker-react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import reqwest from 'reqwest';

class Profile extends React.Component { 
    
    constructor(props){
        super(props);
        this.state= { 
            name : "",
            last_name : "",
            address : "",
            address_details : "",
            city : "",
        }
        this.editPost = this.editPost.bind(this);
        // this.searchMap = this.searchMap.bind(this);
        // console.log(this.props);
    }
    
    editPost(e){
        e.preventDefault();
        console.log("Se está submiteando")
    }
    
    syncField(evento, campo){
        let element = evento.target;
        let value = element.value;

        let jS = {};
        jS[campo] = value;

        this.setState(jS);
        console.log(this.state);

    }
    searchMap(){
        // Buscar this.state.address en el mapa
        // https://nominatim.openstreetmap.org/search?q=#{this.state.address},#{this.state.city}&format=json
        var quer=this.state.address + ", " + this.state.city + ", Argentina"
        reqwest(
            { url: 'https://nominatim.openstreetmap.org/search',
            method: 'GET',
            data: {
                q: quer,
                format: 'json'
            }
        }
        ).then(data=>{this.downloadMap(data)}).catch(err => {console.log(err)});
        // console.log("submit!")

    }
    downloadMap(data){
         console.log(data);
        // Comprobar cantidad de resultados disponibles, y dar a elegir al usuario.
        // Por elmo se mostrará el mapa del lugar 0 (mejor coincidencia)
        let coord = {};
        coord= data['0']['boundingbox'];
        
        let coordinates = data['0'].lon + "," + data['0'].lat;
        console.log(coordinates);
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
            
        }).then(data=>{ this.setState({mapa: data.responseURL});}).catch(err=> { console.log(err)});
    }
    render(){
        return(
        <Grid container>
            <Grid item xs={12}>
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
                        <TextField onChange={ (e)=> this.syncField(e, 'city') } required
                            label = "Ciudad" 
                            variant="outlined"
                            margin="dense"   
                            value = { this.state.city }
                            className="text-profile"
                        /></div>
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