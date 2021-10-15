import axios from "axios";
const baseUrl = "https://uxcandy.com/~shapoval/test-task-backend/v2/"; // API for products

export const customHeaders = {
	Accept: "multipart/form-data",
	//ContentType: "multipart/form-data",
};

export default axios.create({
	baseURL: baseUrl,
	headers: customHeaders,
	params: { developer: "Andranik2" },
});

export const serializeQuery = (query) => {
	return Object.keys(query)
		.map(
			(key) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
		)
		.join("&");
};

export const createFormData = (data) => {
	let formData = new FormData();
	for (const key in data) {
		formData.append(key, data[key]);
	}

	return formData;
};
