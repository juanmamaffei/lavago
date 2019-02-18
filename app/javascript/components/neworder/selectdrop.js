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

/*

function CarrierSelect (drops){
    let items = Object.keys(drops.drops);
    console.log(drops);
    let itemsToReturn = items.map((item)=>  <option key={item}>{item}</option>);
    
    return(
    <Select required
        label = "Retiro por" 
        native
        input={
            <OutlinedInput
                name="city"
                labelWidth={0}                                  
            />}
        margin="dense"   
        
        className="text-profile"
    >  {itemsToReturn}
    </Select>);
}
*/
class SelectDrop extends React.Component { 
    constructor(props){
        super(props);
        this.state = { 
            carrier: "",
            day: "",
            hour: "",
            //laundryId: 0,
            drops: {},
            daysToReturn: [],
            hoursToReturn: [],
        }
        /*store.subscribe(()=>{
            this.setState({ laundryId: store.getState().newOrder.laundryId })
        });*/
        this.getDrops = this.getDrops.bind(this);
        this.loadCarrier = this.loadCarrier.bind(this);
        // this.startNewOrder = this.startNewOrder.bind(this);
    }
    componentDidMount(){
        
        this.getDrops(store.getState().newOrder.laundryId)
        //console.log(this.state);
    }
    loadCarrier(response,carrierList){
        let drops=[];
        let ulti = {};
        let cid = 0;
        let cname = "";
        do{
            
            ulti = response.pop();
            cid=ulti.carrier_id;

            // Agregar los nombres de carrier al id correspondiente en el objeto drops
            for (var i in carrierList){
                if (carrierList[i].id==cid){
                    cname=carrierList[i].name
                }
            }

            if(typeof(drops[cname])=="undefined"){
                drops[cname]=[];
                drops[cname].push(ulti);
            }
            else {
                drops[cname].push(ulti);
            }
            
        } while(response.length>0);
        
        this.setState({drops: drops});
        
    }
    getDrops(lid){
        
        let carrierList = {};
        // Obtener listado de CARRIERS
        reqwest({url: '/carriers.json', method: 'get'}).then(cl=>{carrierList=cl});
        
        reqwest({
            url: '/stocks.json',
            method: 'get',
            data: {
                laundry_id: lid,
                query_type: 'drop'
            }
        }).then(
            data=>{this.loadCarrier(data,carrierList)
                
            }).catch(
                err=>console.log(err));
    }


    syncField(evento, campo){
            let element = evento.target;
            let value = element.value;

            let jS = {};
            jS[campo] = value;

            this.setState(jS);
            console.log(this.state);

            if (campo == "carrier"){
                console.log(this.state.drops[this.state.carrier])
                //this.state.drops[this.state.carrier].map(item=> console.log(item))
                // this.setState({daysToReturn: this.state.drops[this.state.carrier]});
            }
    }
    submit(evento){
        evento.preventDefault();
        this.startNewOrder(this.state);
    }
    /*startNewOrder(data){
        store.dispatch({type: 'START_NEW_ORDER', city:data.city, address:data.address, step: "VER_MAPA"});
        // console.log(store.getState());
    }*/


    render(){

        // Carga de elementos de CARRIER
        let items = Object.keys(this.state.drops);
    
        let itemsToReturn = items.map((item)=>  <option key={item} value={item}>{item}</option>);
        
            return(
            <Grid container alignContent="center" justify="center">
                <Grid item xs={12} lg={4} md={6}>
                    <Card><CardContent>
                        <h2>Opciones de retiro</h2>
                    <form onSubmit={(e)=>this.submit(e)}>
                    <div className="field-profile">
                        <div className="labelOptions">Retiro por:</div>
                        <Select onChange={ (e)=> this.syncField(e, 'carrier') } required
                            label = "Retiro por" 
                            native
                            input={
                                <OutlinedInput
                                    name="Retira"
                                    labelWidth={0}      
                                />}
                            margin="dense"   
                            value = { this.state.carrier }
                            className="text-profile"
                        >  {itemsToReturn}
                        </Select>
                        </div>
                    <div className="field-profile">
                    <div className="labelOptions">Día:</div>
                        <Select onChange={ (e)=> this.syncField(e, 'day') } required
                            label = "Día" 
                            native
                            input={
                                <OutlinedInput
                                  name="day"
                                  labelWidth={0}                                  
                                />}
                            margin="dense"   
                            value = { this.state.city }
                            className="text-profile"
                        >{ this.state.daysToReturn.map((itm)=>  <option key={itm} value={itm}>{itm}</option>) }</Select>
                        </div>
                        <div className="field-profile">
                        <div className="labelOptions">Horario:</div>
                        <Select onChange={ (e)=> this.syncField(e, 'hour') } required
                            label = "Hora" 
                            native
                            input={
                                <OutlinedInput
                                  name="day"
                                  labelWidth={0}                                  
                                />}
                            margin="dense"   
                            value = { this.state.city }
                            className="text-profile"
                        >{ this.state.hoursToReturn.map((itm)=>  <option key={it} value={it}>{it}</option>) }</Select></div><div className="field-profile">
                            <Button variant="contained" color="secondary" type="submit" className="button-profile"> Siguiente</Button>
                        </div>
                    </form>
                    </CardContent>
                    </Card>
                </Grid>
            </Grid>);
    }
}

export default SelectDrop;