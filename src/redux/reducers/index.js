import { combineReducers } from "redux";
import authReducer from "./authReduser";

export default combineReducers({
	auth: authReducer,
});
