import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';


import store from '../../store';

function LaundriesList(props) {
    if (props.step === "VIEW_LAUNDRIES"){
        const laundries = props.laundriesResult;
        const list = laundries.map((laundry)=> 
            <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar alt="LV" src=""/>
            </ListItemAvatar>
            <ListItemText
            primary={laundry.name}
            secondary={
                <React.Fragment>
                <Typography component="span" color="textPrimary">
                    {laundry.address}
                </Typography>
                {"Puntos recibidos: "+ laundry.score}
                </React.Fragment>
            }
            />
            </ListItem>
        );    
        
        
        return (<List >{list}</List>);
    }
    return (<h2>No seleccionaste tu ubicación</h2>);
}

class ViewLaundries extends React.Component{
    constructor(props){
        super(props);
        this.state = { step: this.props.newOrder.step, laundriesResult: this.props.laundriesResult};
        store.subscribe(()=>{
            this.setState({
                laundriesResult: store.getState().laundriesResult,
                step: store.getState().newOrder.step,
            })
        })
    }
    
    

    render(){return(
    <Grid container alignContent="center" justify="center">
    <Grid item xs={12} lg={4} md={6}>
        <Card><CardContent>
            
 
        <LaundriesList laundriesResult={this.state.laundriesResult} step={this.state.step} />
        


        </CardContent>
        </Card>
    </Grid>
    </Grid>
);}
}

export default ViewLaundries;