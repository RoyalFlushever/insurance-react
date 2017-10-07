import axios from 'axios';

export class UserService {

    static BASE_URL = '/api/user/';
    static ADMIN_LABEL = 'ADMINISTRATOR';

    static promiseMe: Promise<any>;

    static getMe(){

        if(!this.promiseMe){
            this.promiseMe = axios({
                method: 'get',
                url: '/me',
                baseURL: this.BASE_URL
            });
        }
        return this.promiseMe;
    }

    static findUsers(query){
        return axios({
            method: 'get',
            url: '',
            params: query,
            baseURL: this.BASE_URL
        });
    }

    static findUsersInOvatioGroup(){
        return axios({
            method: 'get',
            url: '',
            data: {
                isGroupOvation: true
            },
            baseURL: this.BASE_URL
        });
    }
    static findAccountManger(){
        return axios({
            method: 'get',
            url: '/accountManager',
            data: {
            },
            baseURL: this.BASE_URL
        });
    }

    static isAdmin(user) : boolean{
        if(user && user.role && user.role.label){
            return user.role.label == this.ADMIN_LABEL;
        } else{
            return false;
        }
    }


}