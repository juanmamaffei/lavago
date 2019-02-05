import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import store from '../../store';
import reqwest from 'reqwest';


class GetMap extends React.Component{
    constructor(props){
        super(props);
        this.state={
            address: this.props.newOrder.address,
            city: this.props.newOrder.city,
            lat: this.props.newOrder.lat,
            lon: this.props.newOrder.lon,
            mapa: "",
            error: "",
            step: this.props.newOrder.step
        }
        store.subscribe(()=>{
            this.setState({
                address: store.getState().newOrder.address,
                city: store.getState().newOrder.city,
                lat: store.getState().newOrder.lat,
                lon: store.getState().newOrder.lon,
                responseURL: store.getState().newOrder.responseURL,
                step: store.getState().newOrder.step,
            })
        })

        this.searchMap = this.searchMap.bind(this);
        this.downloadMap = this.downloadMap.bind(this);
        this.useLocation = this.useLocation.bind(this);
        this.successMap = this.successMap.bind(this);
        this.comeBack = this.comeBack.bind(this);
    }

    submit(evento){
        evento.preventDefault();
        this.setState({mapa: ""})
        // this.startNewOrder(this.state);
        reqwest({
            url: '/laundries.json',
            method: 'GET',
            data: {
                lat:this.state.lat, lon:this.state.lon
            }
        }).then(laundriesResult=>{this.startNewOrder(laundriesResult)}).catch(err=>{console.log(err)});
    }
    startNewOrder(laundriesResult){
        store.dispatch({type: 'CONFIRM_ADDRESS', lat:this.state.lat, lon:this.state.lon, laundriesResult, step: "VIEW_LAUNDRIES"});
        console.log(store.getState());
    }
    comeBack(a){
        a.preventDefault();
        store.dispatch({type:"START_NEW_ORDER", step: ""});
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
        ).then(data=>{this.downloadMap(data); }).catch(err=> {  this.setState({error: err, open:true})});

    }
    downloadMap(data){
         
        // Comprobar cantidad de resultados disponibles, y dar a elegir al usuario.
        // Por elmo se mostrará el mapa del lugar 0 (mejor coincidencia)
        let coord = {};
        coord= data['0']['boundingbox'];
        
        let coordinates = data['0'].lon + "," + data['0'].lat;
        this.setState({ lat: data['0'].lat, lon: data['0'].lon})
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

    useLocation(a){
        a.preventDefault();
        // Mostrar imagen de "cargando..."
        this.setState({mapa: ""})
        // Usar las funciones de obtener coordenadas del navegador, y almacenarlas en el state.
        
        navigator.geolocation.getCurrentPosition(this.successMap);
        
    }

    successMap(position) {
        // Llamar a la función downloadMap pero con las coordenadas nuevas
        this.setState({lat:position.coords.latitude, lon:position.coords.longitude});
        reqwest({
            url: 'http://api.tomtom.com/map/1/staticimage',
            method: 'GET',
            data: {
                center: position.coords.longitude + "," + position.coords.latitude,
                format: 'jpg',
                key: '6fEWMnnxWPDJ3BpQGKffuMUlyQiBlUlu',
                zoom: '15',
            },
            
        }).then(data=>{ this.setState({mapa: data.responseURL});})
        .catch(err=> {  this.setState({error: err, open:true})});


      }
      componentDidMount(){
        if (this.state.step === "VER_MAPA"){
            this.searchMap();
            console.log("Buscando mapa");
            store.dispatch({type: "STOP_SEARCHING_MAP"});
        }
        //console.log(this.state.step);
    }
    componentDidUpdate(){
        if (this.state.step === "VER_MAPA"){
            this.searchMap();
            console.log("Buscando mapa");
            store.dispatch({type: "STOP_SEARCHING_MAP"});
        }
        //console.log(this.state.step);
    }
    componentWillUnmount(){
        
    }
    render(){
        return(
            <Grid container alignContent="center" justify="center">
                <Grid item xs={12} lg={4} md={6}>
                    <Card><CardContent>
                        <h2>¿Es acá?</h2>
                    <form onSubmit={(e)=>this.submit(e)}>
                    <div className="field-profile">
                        <Button variant="contained" color="secondary" type="submit" className="button-profile"> Sí! Ahí está mi casa!</Button>
                    </div>
                    <div className="field-profile">
                        <Button variant="contained" color="primary" onClick={(a)=>{this.useLocation(a)}} className="button-profile"> Prefiero usar mi ubicación</Button>
                    </div>
                    <div className="field-profile">
                        <Button variant="contained" color="default" onClick={(a)=>{this.comeBack(a)}} className="button-profile"> Corregir dirección</Button>
                    </div>
                    <div className="mapContainer">
                        <div className="mapMarker">&#x25B2;</div>
                        <CircularProgress color="secondary" className="preloader" />
                        <img src= {this.state.mapa} className="mapa"></img>
                    </div>
                    
                    </form>
                    </CardContent>
                    </Card>
                </Grid>
            </Grid>

        );
    }
}

export default GetMap;