
import { combineReducers } from "redux";
import serviceReducers from "./serviceReducers";
import workdaysReducers from "./workdaysReducers";


const rootReducer = combineReducers({
    serviceReducers,
    workdaysReducers,
});

export default rootReducer;
