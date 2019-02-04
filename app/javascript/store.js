import { createStore } from 'redux';

const reducer = (state={}, action) => {
    switch(action.type){
        case "LOAD_CURRENT_USER":{
            return {
                ...state,
                currentUser: {
                    id: action.id,
                    name: action.name,
                    last_name: action.last_name,
                    address: action.address,
                    address_details: action.address_details,
                    city: action.city,
                },
            }
        }
        case "UPDATE_ADDRESS":{
            return {
                ...state,
                currentUser: {
                    address: action.address
                }
            }
        }
        default : {
            return state;
        }
    }
}

export default createStore(reducer, {currentUser:{id: "", name: "", last_name: "", address: "", address_details: "", city: ""}});