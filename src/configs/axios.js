import axios from "axios";
import store from "../redux/store";
axios.defaults.baseURL = "https://uxcandy.com/~shapoval/test-task-backend/v2/";
axios.defaults.headers["Content-Type"] = "multipart/form-data";

axios.interceptors.request.use(
	function (config) {
		//console.log("axios", config);
		config.url = config.url.includes("?")
			? config.url + "&developer=Andranik"
			: config.url + "?developer=Andranik";
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

export default axios;
