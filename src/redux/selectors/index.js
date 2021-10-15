import { createSelector } from "reselect";

export const getState = (state) => state;

export const getAuth = createSelector(getState, (state) => {
	return state.auth;
});
