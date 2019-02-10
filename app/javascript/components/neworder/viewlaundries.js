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
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import CheckboxList from './selectproduct';

import reqwest from 'reqwest';
import store from '../../store';

function LaundriesList(props) {
    if (props.step === "VIEW_LAUNDRIES"){
        const laundries = props.laundriesResult;
        const list = laundries.map((laundry)=> 
            <ListItem alignItems="flex-start" button key={laundry.id} onClick={(a)=>{selectLaundry(a,laundry.id)}}>
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
        
        if (laundries.length === 0){
            return(<p>Disculpános! Todavía no hay lavanderías en tu zona. Te gustaría sugerirnos alguna?</p>);
        }
        return (<List component="nav" >{list}</List>);
    }
    return (<h2>No seleccionaste tu ubicación</h2>);
}
function ProductsList(props) {

    console.log(props)
        /* const products = props;
        const list = products.map((product)=> 
            <li>{product.name}</li>
        );    
        
        if (products.length === 0){
            return(<p>No hay productos que mostrar.</p>);
        }
        return (<ul>{list}</ul>);
        */
}
function selectLaundry(a,id){
    a.preventDefault();
    let url = "/laundries/" + id + "/products.json"
    reqwest({
        url: url,
        method: 'get'
    }).then((data)=>{
        loadProducts(data);
        console.log(data);
        }
    ).catch((err)=>{console.log(err)});
}
function loadProducts(data){
    store.dispatch({ type: "SHOW_PRODUCTS", laundryProducts: data });
}

class ViewLaundries extends React.Component{
    constructor(props){
        super(props);
        this.state = { step: this.props.newOrder.step, laundriesResult: this.props.laundriesResult , showProducts: false, laundryProducts: {}};
        store.subscribe(()=>{
            this.setState({
                laundriesResult: store.getState().laundriesResult,
                step: store.getState().newOrder.step,
                showProducts: store.getState().showProducts,
                laundriesResult: store.getState().laundriesResult
            })
        })
        // this.selectLaundry = this.selectLaundry.bind(this);
    }
    

    // Cerrar diálogo
      handleClose = () => {
        store.dispatch({ type: "HIDE_PRODUCTS" });
      };

    render(){return(
    <Grid container alignContent="center" justify="center">
    <Grid item xs={12} lg={4} md={6}>
        <Card><CardContent>
        
        <LaundriesList laundriesResult={this.state.laundriesResult} step={this.state.step} />

        <Dialog open={this.state.showProducts} >
        <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle>
        <DialogContent>
          <ProductsList laundryProducts={this.state.laundryProducts}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={()=>{}} color="primary">
            Encargar!
          </Button>
        </DialogActions>
      </Dialog>


        </CardContent>
        </Card>
    </Grid>
    </Grid>
);}
}

export default ViewLaundries;