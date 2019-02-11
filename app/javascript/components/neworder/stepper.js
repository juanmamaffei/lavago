// Componente que muestra los pasos de una orden y el estado actual de la misma, permitiendo también navegar hacia atrás o adelante.
// implementa el componente stepper de material ui
// https://material-ui.com/demos/steppers/

import React from 'react';
import store from '../../store';
import MobileStepper from '@material-ui/core/MobileStepper';
/* import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
*/
import Grid from '@material-ui/core/Grid';

class Stepper extends React.Component{
    constructor(props) {
      super(props)
    
      this.state = {
         step: '',
         activeStep: 0
      }
      store.subscribe(()=>{
        this.setState({ step: store.getState().newOrder.step })
      });
      this.indentifyActiveStep = this.indentifyActiveStep.bind(this);
    }
    
    indentifyActiveStep(step){
        switch (step) {
            case 'VER_MAPA':
                return 1;
            case 'MAPA_OK':
                return 1;
            case 'VIEW_LAUNDRIES':
                return 2;
            case 'ELEGIR_PRODUCTO':
                return 3;
            case 'SELECT_DROP':
                return 3;
            default:
                return 0;
        }
    }

    render(){
        return(
            <Grid container
                direction="row"
                justify="center"
                alignItems="center">

                <MobileStepper 
                variant="dots"
                steps={6}
                position="static"
                activeStep={this.indentifyActiveStep(this.state.step)}
                /* backButton={
                    <Button size="small">
                    <KeyboardArrowLeft />
                    Back
                    </Button>
                }*/
                />
            </Grid>
        );
    }
}

export default Stepper;