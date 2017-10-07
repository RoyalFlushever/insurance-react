import 'whatwg-fetch'

export const fetchGet = (url, data) => (
    fetch(`api/contact${url}?expert_id=${data.expert_id}`, {
        method: 'GET',
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'same-origin',
    })
)

export const fetchPost = (url, data) => (
    fetch(`api/contact${url}`, {
        method: 'POST',
        body: JSON.stringify({
            expert_id: data.expert_id,
            first_name: data.first_name,
            last_name: data.last_name,
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            zipCode: data.zipCode,
            switchboardPhone: data.phone,
            fax: data.fax,
            skill: data.skill,
            gender: data.gender,
            mobile: data.mobile,
            email: data.email
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
    fetch(`api/contact${url}/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            first_name: data.first_name,
            last_name: data.last_name,
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            zipCode: data.zipCode,
            switchboardPhone: data.phone,
            fax: data.fax,
            skill: data.skill,
            gender: data.gender,
            mobile: data.mobile,
            email: data.email
        }),
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'same-origin',
    })
)

export const fetchDelete = (url, data) => (
    fetch(`api/contact${url}/${data.id}`, {
        method: 'DELETE',
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'same-origin',
    })
)
