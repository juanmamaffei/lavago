import React from 'react';
import MenuAppBar from '../components/MenuAppBar';
import LabelBottomNavigation from '../components/LabelBottomNavigation';
import store from '../store';

// Para obtener las coordenadas...
// navigator.geolocation.getCurrentPosition(console.log);

class Application extends React.Component{
    constructor(props){
        super(props);
        
    }
    loadUser(currentUser){
        store.dispatch({
            type: "LOAD_CURRENT_USER",
            currentUser,
        });
        console.log(store.getState());
    }
    componentDidMount(){
       this.loadUser(this.props);
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