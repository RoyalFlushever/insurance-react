import * as types from './types'
import { fetchGet, fetchPost, fetchPut, fetchDelete } from '../services/contact'

export const loadContacts = (expert_id) => dispatch => {
    fetchGet('/contact', {expert_id: expert_id}).then((response) => {
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
                type: types.LOAD_CONTACTS,
                contacts: results
            })
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const addContact = (expert_id, first_name, last_name, address1, address2, zipCode, email, city, phone, mobile, fax, skill, gender) => dispatch => {
console.log(expert_id)
    fetchPost('/contact', {
        expert_id: expert_id,
        first_name: first_name,
        last_name: last_name,
        address1: address1,
        address2: address2,
        city: city,
        zipCode: zipCode,
        phone: phone,
        fax: fax,
        skill: skill,
        gender: gender,
        mobile: mobile,
        email: email
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
                type: types.LOAD_CONTACT,
                contact: result
            })
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const updateContact = (id, first_name, last_name, address1, address2, zipCode, email, city, phone, mobile, fax, skill, gender) => dispatch => {
    fetchPut('/contact', {
        id: id,
        first_name: first_name,
        last_name: last_name,
        address1: address1,
        address2: address2,
        city: city,
        zipCode: zipCode,
        phone: phone,
        fax: fax,
        skill: skill,
        gender: gender,
        mobile: mobile,
        email: email
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

export const deleteContact = (id) => dispatch => {
    fetchDelete('/contact', {id: id}).then((response) => {
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
