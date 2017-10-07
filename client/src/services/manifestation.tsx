import axios from 'axios';

export class ManifestationService {

	static BASE_URL = '/api/manifestations/';

	static find(query){
		return axios({
			method: 'get',
			url: query.id,
			baseURL: this.BASE_URL
		});
	}
	static update(id, data){
		return axios({
			method: 'put',
			url: '/update/'+id,
			data: data,
			baseURL: this.BASE_URL
		});
	}
}