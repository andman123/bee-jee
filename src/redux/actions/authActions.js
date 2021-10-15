import { LOGIN, LOGIN_FAILED, LOGOUT } from "../constants/auth-action-types";
import AccountRepository from "../../repositories/AccountRepository";

export const login = (data) => {
	return async (dispatch) => {
		console.log(data);
		const result = await AccountRepository.login(data);
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
