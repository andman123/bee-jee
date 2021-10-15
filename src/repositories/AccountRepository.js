import Repository, { createFormData } from "./Repository";

class AccountRepository {
	async login(data) {
		const response = await Repository.post("/login", createFormData(data));

		return response;
	}
}

export default new AccountRepository();
