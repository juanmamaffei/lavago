import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import AddBoxIcon from '@material-ui/icons/AddBox';
import RepeatIcon from '@material-ui/icons/Repeat';
// import store from '../store';

const styles = {
  root: {
    width: 'auto',

  },
};

class LabelBottomNavigation extends React.Component {
 
  state = {
    value: 'recents',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation value={value} onChange={this.handleChange} className="lbn" showLabels={true}>
        <BottomNavigationAction label="Nuevo lavado" value="nuevo_lavado" icon={<AddBoxIcon />} onClick={()=>{window.location.href= "/orders/new"} }/>
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