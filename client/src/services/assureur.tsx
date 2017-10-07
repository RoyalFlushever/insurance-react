import axios from 'axios';

export class AssureurService {

    static BASE_URL = '/api/insuranceCompany/';

    static getAssurreurById(id){
        return axios({
            method: 'get',
            url: id,
            data: {},
            baseURL: this.BASE_URL
        });
    }

    static find(){
        return axios({
            method: 'get',
            url: '',
            data: {},
            baseURL: this.BASE_URL
        });
    }
}