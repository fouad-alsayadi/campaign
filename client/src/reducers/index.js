import { combineReducers } from "redux";
import {processAuthAction} from "./authReducer";

export default combineReducers({
    auth: processAuthAction
});