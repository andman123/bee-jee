import { LOGIN, LOGIN_FAILED, LOGOUT } from "../constants/auth-action-types";
import axios from "../../configs/axios";

export const login = (data) => {
	return async (dispatch) => {
		const result = await axios.post("login", data);
		console.log(result);
		dispatch({
			type: result.data.status === "ok" ? LOGIN : LOGIN_FAILED,
			payload: result.data.message,
		});
	};
};

export const logout = () => {
	return async (dispatch) => {
		dispatch({ type: LOGOUT });
	};
};
