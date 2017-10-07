import axios from 'axios';

export class PdfService {

	static BASE_URL = '/api/pdfs/';

	// static getPDF(query){
	// 	return axios({
	// 		method: 'get',
	// 		url: '',
	// 		params: query,
	// 		baseURL: this.BASE_URL
	// 	});
	// }
	static generatePDF(data){
		return axios({
			method: 'post',
			url: '',
			data: data,
			baseURL: this.BASE_URL
		});
	}
	// static update(id, data){
	// 	return axios({
	// 		method: 'put',
	// 		url: '/'+id,
	// 		data: data,
	// 		baseURL: this.BASE_URL
	// 	});
	// }
	// static delete(id){
	// 	return axios({
	// 		method: 'delete',
	// 		url: '/'+id,
	// 		baseURL: this.BASE_URL
	// 	});
	// }
}