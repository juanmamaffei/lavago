import React from 'react';
import WebpackerReact from 'webpacker-react';
import GetAddress from '../components/neworder/getaddress';


class NewOrder extends React.Component{


    render(){
        return(<div>
            
            <p>1) Solicitar dirección y localidad (por defecto Rosario)</p>
            <GetAddress />
            <p>Pedir confirmación de dirección (con imagen de mapa) y en su defecto, solicitar ubicación</p>
            <p>Mostrar lavanderías disponibles</p>
            <p>Mostrar productos disponibles</p>
            <p>Mostrar horarios de retiro</p>
            <p>Mostrar horarios de entrega</p>
            <p>Elegir medio de pago</p>
            <p>confirmación</p>

        </div>);
    }
}


WebpackerReact.setup({NewOrder});