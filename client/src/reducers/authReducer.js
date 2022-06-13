import { FETCH_USER } from "../actions/types";
export  function processAuthAction(state = null, action){
    console.log("Processing Auth Action" + JSON.stringify(action));
    switch (action.type) {
        case FETCH_USER:  
            return action.payload || false;                     
        default:
            return state;
    }
}