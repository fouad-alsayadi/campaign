import axios from "axios";
import { FETCH_USER } from "./types";
export const fetchUser = () => {
    console.log("Fetchig user ... ");
    return  async function(dispatch)  {
        console.log("calling the api ... ");
        const res = await axios.get("/api/current_user")        
        console.log("dispatching ... "+ JSON.stringify(res));
        dispatch({ type: FETCH_USER, payload: res.data })
    }
  };
