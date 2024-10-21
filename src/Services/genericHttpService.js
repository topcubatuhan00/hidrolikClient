import axios from "axios";
import { toast } from 'react-toastify';

class GenericApiSerice {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	async get(path, id = null) {
		let requestUrl = id === null ? `${this.baseUrl}${path}` : `${this.baseUrl}${path}/${id}`;
		const response = await axios.get(requestUrl);
		return response;
	}

	async post(path, data) {
		let response = null;
		try {
			response = await axios.post(`${this.baseUrl}${path}`, data);
		} catch (error) {
			toast.error(error.response.data.error);
		}
		if (response !== null && response.status === 200) {
			if(path === "/Auth/Register"){
				return true;
			}
			return response.data;
		}
		else { }
	}

	async put(path, data) {
		const response = await axios.put(`${this.baseUrl}${path}`, data);
		return response;
	}

	async delete(path) {
		const response = await axios.delete(`${this.baseUrl}${path}`);
		return response;
	}
}

const genericApiSerice = new GenericApiSerice("https://localhost:7178/api");
export default genericApiSerice;