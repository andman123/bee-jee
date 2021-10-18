import Repository, { serializeQuery, createFormData } from "./Repository";

class TaskRepository {
	async getTasks(params) {
		const response = await Repository.get(`/?${serializeQuery(params)}`);
		return response;
	}

	async createTask(data) {
		const response = await Repository.post("/create", createFormData(data));

		return response;
	}

	async editTask(id, data) {
		const response = await Repository.post(
			`/edit/${id}`,
			createFormData(data)
		);

		return response;
	}
}

export default new TaskRepository();
