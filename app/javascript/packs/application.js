import React from 'react';
import MenuAppBar from '../components/MenuAppBar';
import LabelBottomNavigation from '../components/LabelBottomNavigation';
// import store from '../store';

// Para obtener las coordenadas...
// navigator.geolocation.getCurrentPosition(console.log);

class Application extends React.Component{
    constructor(props){
        super(props);
        
    }
    
    render(){
        return(<div className="pantalla-completa">
            
            <MenuAppBar />
            
            <footer>
                <LabelBottomNavigation />
            </footer>
        
        </div>
        );
    }
}

WebpackerReact.setup({Application});