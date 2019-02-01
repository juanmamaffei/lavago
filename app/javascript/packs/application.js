import React from 'react';
import MenuAppBar from '../components/MenuAppBar';

class Application extends React.Component{
    render(){
        return(<MenuAppBar />);
    }
}

WebpackerReact.setup({Application});