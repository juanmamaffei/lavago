import React from 'react';
import MenuAppBar from '../components/MenuAppBar';
import LabelBottomNavigation from '../components/LabelBottomNavigation';

// import { Router, Route, browserHistory } from 'react-router';

class Application extends React.Component{
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