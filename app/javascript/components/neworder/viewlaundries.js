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
//import CheckboxList from './selectproduct';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
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
            return(<p>Disculpános! Todavía no hay lavanderías que usen Lavago en tu zona. Te gustaría sugerirnos alguna?</p>);
        }
        return (<List component="nav" >{list}</List>);
    }
    return (<h2>No seleccionaste tu ubicación</h2>);
}

function selectLaundry(a,id){
    a.preventDefault();
    let url = "/laundries/" + id + "/products.json"
    reqwest({
        url: url,
        method: 'get'
    }).then((data)=>{
        loadProducts(data,id);
        // console.log(data);
        }
    ).catch((err)=>{console.log(err)});
}
function loadProducts(data,lid){
    store.dispatch({ type: "SHOW_PRODUCTS", laundryProducts: data, laundryId: lid });
}

class ViewLaundries extends React.Component{
    constructor(props){
        super(props);
        this.state = { step: this.props.newOrder.step, laundriesResult: this.props.laundriesResult , showProducts: false, laundryProducts: [], laundryId: 0};
        store.subscribe(()=>{
            this.setState({
                laundriesResult: store.getState().laundriesResult,
                step: store.getState().newOrder.step,
                showProducts: store.getState().showProducts,
                laundryProducts: store.getState().laundryProducts,
                checked: [0],
                laundryId: store.getState().laundryId
            })
        })
        // this.selectLaundry = this.selectLaundry.bind(this);
        this.submit = this.submit.bind(this);
    }
    

    // Cerrar diálogo
      handleClose = () => {
        store.dispatch({ type: "HIDE_PRODUCTS" });
      };

      handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        
        this.setState({
          checked: newChecked,
        });
        // checked en esta clase es selectedProducts en el store con la orden type UPDATE_PRODUCTS
        
        // store.dispatch({type: "UPDATE_PRODUCTS", selectedProducts: newChecked});
        // console.log(this.state); 
      };

      submit(e){
        e.preventDefault();
        
        /* Esta función mete el CHECKED en los productos de NEWORDER en el store,
        además, cierra el cuadro de diálogo y
        cambia el STEP para pasar a elegir el envío */
        store.dispatch({ type: "SUBMIT_PRODUCTS", selectedProducts: this.state.checked, laundryId: this.state.laundryId})
      }
    render(){return(
    <Grid container alignContent="center" justify="center">
    <Grid item xs={12} lg={4} md={6}>
        <Card><CardContent>
        
        <LaundriesList laundriesResult={this.state.laundriesResult} step={this.state.step} />

        <Dialog open={this.state.showProducts} >
            <form onSubmit={this.submit}>
                <DialogTitle id="confirmation-dialog-title">Productos disponibles</DialogTitle>
                <DialogContent>
                


                    <List >
                {this.state.laundryProducts.map(value => (
                <ListItem key={value.id} role={undefined} dense button onClick={this.handleToggle(value)}>
                    <Checkbox
                    checked={this.state.checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    />
                    <ListItemText primary={value.name } />
                    <ListItemSecondaryAction>
                    $ {value.price}
                    </ListItemSecondaryAction>
                </ListItem>
                ))}
                
            </List>



            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleClose} color="primary">
                Cancelar
            </Button>
            <Button color="primary" type="submit">
                Encargar!
            </Button>
            </DialogActions>
        </form>
      </Dialog>


        </CardContent>
        </Card>
    </Grid>
    </Grid>
);}
}

export default ViewLaundries;