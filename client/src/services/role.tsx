import axios from 'axios';

export class RolesService {

    static BASE_URL = '/api/roles/';

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