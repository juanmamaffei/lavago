import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import AddBoxIcon from '@material-ui/icons/AddBox';
import RepeatIcon from '@material-ui/icons/Repeat';
import store from '../store';

const styles = {
  root: {
    width: 'auto',

  },
};

class LabelBottomNavigation extends React.Component {
  constructor(){
    super();
    this.nuevoLavado = this.nuevoLavado.bind(this);
  }
  state = {
    value: 'recents',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };


  nuevoLavado = () => {
    //Almacenar la dirección actual y ciudad en el store
    store.dispatch({type: "UPDATE_ADDRESS", address: "Probando el store"});
    console.log("Acción enviada");
    // Redirección
    window.location.href= "/orders/new";
  }
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation value={value} onChange={this.handleChange} className="lbn" showLabels={true}>
        <BottomNavigationAction label="Nuevo lavado" value="nuevo_lavado" icon={<AddBoxIcon />} onClick={()=>{store.dispatch({type: "UPDATE_ADDRESS", address: "Probando el store"});console.log(store.getState())}} />
        <BottomNavigationAction label="Mis lavados" value="mis_lavados" icon={<ListIcon />} onClick={()=>{window.location.href= "/orders/"}} />
        <BottomNavigationAction label="Mi suscripción" value="mi_suscripcion" icon={<RepeatIcon />} onClick={()=>{window.location.href= "/suscriptions"}} />
      </BottomNavigation>
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LabelBottomNavigation);