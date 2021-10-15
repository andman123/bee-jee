import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import rootReducer from "./reducers";

const composeEnhancers =
	process.env.NODE_ENV !== "production" &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				name: "LynxHubs",
				actionsBlacklist: ["REDUX_STORAGE_SAVE"],
		  })
		: compose;

export default createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(reduxThunk))
);
