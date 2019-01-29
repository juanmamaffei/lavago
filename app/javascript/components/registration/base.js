import React from 'react';


export class Base extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            canSubmit: true, email: '', password: '', passwordConfirmation: '', error: '', errors: ''
        }
        this.disableSubmitBtn = this.disableSubmitBtn.bind(this);
        this.enableSubmitBtn = this.enableSubmitBtn.bind(this);
        this.mostrarSubmit = this.mostrarSubmit.bind(this);
        this.syncField = this.syncField.bind(this);
        
    }

    reload(){
        window.location.href = window.location.href;
    }
    enableSubmitBtn(){
        this.setState({ canSubmit: true });
    }

    disableSubmitBtn(){
        this.setState({ canSubmit: false });
    }

    syncField(evento, campo){
        let element = evento.target;
        let value = element.value;

        let jS = {};
        jS[campo] = value;

        this.setState(jS);
        // console.log(this.state);

    }
    mostrarSubmit(){
        console.log(this.state.email);
        console.log(this.state.password);
    }
   
}