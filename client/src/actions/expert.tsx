import * as types from './types'
import { fetchGet, fetchPost, fetchPut, fetchDelete } from '../services/expert'

export const getCount = () => dispatch => {
    fetchGet('/count', {params: ""}).then((response) => {
        response.json().then((result) => {
            dispatch({
                type: types.GET_EXPERT_COUNT,
                count: result
            })
        })
    })
}
export const loadExperts = (params) => dispatch => {
    fetchGet('', {params: params}).then((response) => {
        if (response.status !== 200) {
            response.json().then((json) => {
                let message = json.message
                if (Array.isArray(message)) {
                    message = message.join()
                }
            })
            return
        }

        response.json().then((results) => {
            dispatch({
                type: types.LOAD_EXPERTS,
                experts: results
            })
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const saveExpert = (business, address, address2, city, zipCode, country, phone, email, fax) => dispatch => {
    fetchPost('', {
        business: business,
        address1: address,
        address2: address2,
        city: city,
        zipCode: zipCode,
        country: country,
        phone: phone,
        email: email,
        fax: fax
    }).then((response) => {
        if (response.status !== 200) {
            response.json().then((json) => {
                let message = json.message
                if (Array.isArray(message)) {
                    message = message.join()
                }
            })
            return
        }

        response.json().then((result) => {
            dispatch({
                type: types.LOAD_EXPERT,
                expert: result
            })
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const updateExpert = (id, business, address, address2, city, zipCode, country, phone, email, fax) => dispatch => {
    fetchPut('', {
        id: id,
        business: business,
        address1: address,
        address2: address2,
        city: city,
        zipCode: zipCode,
        country: country,
        phone: phone,
        email: email,
        fax: fax
    }).then((response) => {
        if (response.status !== 200) {
            response.json().then((json) => {
                let message = json.message
                if (Array.isArray(message)) {
                    message = message.join()
                }
            })
            return
        }

        response.json().then((results) => {
            console.log("updated")
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const deleteExpert = (id) => dispatch => {
    fetchDelete('', {id: id}).then((response) => {
        if (response.status !== 200) {
            response.json().then((json) => {
                let message = json.message
                if (Array.isArray(message)) {
                    message = message.join()
                }
            })
            return
        }

        response.json().then((results) => {
            console.log("deleted")
        })
    }).catch((err) => {
        console.log(err)
    })
}
