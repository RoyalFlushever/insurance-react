import 'whatwg-fetch'
import axios from 'axios';

export class ExpertService {

    static BASE_URL = '/api/experts/';

    static find() {
        return axios({
            method: 'get',
            url: '',
            data: {},
            baseURL: this.BASE_URL
        });
    }

}

export const fetchGet = (url, data) => (
    data.params === "" ?
        fetch(`api/experts${url}`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'same-origin',
        }) :
        fetch(`api/experts${url}?offset=${data.params.offset}&sort=${data.params.sort}&order=${data.params.order}&search=${data.params.search}&limit=${data.params.limit}&email=${data.email}&fax=${data.fax}`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'same-origin',
        })
)

export const fetchPost = (url, data) => (
    fetch(`api/experts${url}`, {
        method: 'POST',
        body: JSON.stringify({
            businessName: data.business,
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            zipCode: data.zipCode,
            country: data.country,
            switchboardPhone: data.phone,
            email: data.email,
            fax: data.fax
        }),
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'same-origin',
    })
)

export const fetchPut = (url, data) => (
    console.log(data),
    fetch(`api/experts${url}/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            businessName: data.business,
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            zipCode: data.zipCode,
            country: data.country,
            switchboardPhone: data.phone,
            email: data.email,
            fax: data.fax
        }),
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'same-origin',
    })
)

export const fetchDelete = (url, data) => (
    fetch(`api/experts${url}/${data.id}`, {
        method: 'DELETE',
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'same-origin',
    })
)
