import { LOGIN, LOGOUT, LOGIN_FAILED } from "../constants/auth-action-types";

const userData = JSON.parse(localStorage.getItem("loggedUser"));
const initialState = userData || {
	token: false,
	errorMessage: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			let newState = {
				token: action.payload.token,
			};
			localStorage.setItem("loggedUser", JSON.stringify(newState));
			return newState;
		case LOGIN_FAILED:
			return {
				...state,
				errorMessage: action.payload,
			};
		case LOGOUT:
			localStorage.removeItem("loggedUser");
			return {
				token: false,
			};
		default:
			return state;
	}
};

export default authReducer;
