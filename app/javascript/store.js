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
        case "START_NEW_ORDER":{

            return{
                ...state,
                newOrder: {
                    city: action.city,
                    address: action.address,
                    step: action.step,

                }
            }
        }
        case "STOP_SEARCHING_MAP":{
            return{
                ...state,
                newOrder: {
                    step: "MAPA_OK"
                }
            }
        }
        default : {
            return state;
        }
    }
}

export default createStore(reducer);