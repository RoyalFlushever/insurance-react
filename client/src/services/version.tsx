import axios from 'axios';

export class VersionService {

	static BASE_URL = '/api/versions/';

	static find(query){
		return axios({
			method: 'get',
			url: '',
			params: query,
			baseURL: this.BASE_URL
		});
	}
	static insert(data){
		return axios({
			method: 'post',
			url: '',
			data: data,
			baseURL: this.BASE_URL
		});
	}
	static update(id, data){
		return axios({
			method: 'put',
			url: '/'+id,
			data: data,
			baseURL: this.BASE_URL
		});
	}
	static delete(id){
		return axios({
			method: 'delete',
			url: '/'+id,
			baseURL: this.BASE_URL
		});
	}
}