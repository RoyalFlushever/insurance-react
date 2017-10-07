import axios from 'axios';

export class BusinessProviderService {

    static BASE_URL = '/api/businessProviders/';

    static find(){
        return axios({
            method: 'get',
            url: '',
            data: {
            },
            baseURL: this.BASE_URL
        });
    }
}