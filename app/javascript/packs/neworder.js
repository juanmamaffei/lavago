import React from 'react';
import WebpackerReact from 'webpacker-react';

import GetAddress from '../components/neworder/getaddress';
import GetMap from '../components/neworder/getmap';
import ViewLaundries from '../components/neworder/viewlaundries';

import store from '../store';

function ToggleComponents(props){
    switch (props.step) {
        case '':
            return(<GetAddress address={props.address} />);
        case 'VER_MAPA':
            return(<GetMap newOrder={props.newOrder}/>);
        case 'MAPA_OK':
            return(<GetMap newOrder={props.newOrder}/>); 
        case 'VIEW_LAUNDRIES':
            return(<ViewLaundries laundriesResult={props.laundriesResult} newOrder={props.newOrder}/>);
    
        default:
            return "Nothing to return..."
    }
}

class NewOrder extends React.Component{

    constructor(props){
        super(props);

        this.state= { step: "", laundriesResult: []};

        store.subscribe(()=>{
            this.setState({
                step: store.getState().newOrder.step,
                newOrder: store.getState().newOrder,
                laundriesResult: store.getState().laundriesResult,
             });
        });
    }

    render(){
        return(<div>
            <ToggleComponents step={this.state.step} address={this.props.address} newOrder={this.state.newOrder} laundriesResult={this.state.laundriesResult}/>
            
        </div>);
    }
}


WebpackerReact.setup({NewOrder});

/* 
Paso | Descripción                                                  | Step
-----------------------------------------------------------------------------------
  1  | Elegir dirección y localidad.                                | 
  2  | Verificar si el mapa es correcto o seleccionar ubicación.    | VER_MAPA / MAPA_OK
  3  | Elegir lavandería con las coordenadas almacenadas            | VIEW_LAUNDRIES
  4
  */