import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createAdd = (add, token) => {
    let createAddEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createAddEndpoint = `${API}/recommended`;
    } else if (isAuth() && isAuth().role === 0) {
        createAddEndpoint = `${API}/user/recommended`;
    }

    return fetch(`${createAddEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: add
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listAllAdds = (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/recommendeds-adds`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleAdd = slug => {
    return fetch(`${API}/recommended/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = username => {
    let listAddsEndpoint;

    if (username) {
        listAddsEndpoint = `${API}/${username}/recommendeds`;
    } else {
        listAddsEndpoint = `${API}/recommendeds`;
    }

    return fetch(`${listAddsEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeAdd = (slug, token) => {
    let deleteAddEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deleteAddEndpoint = `${API}/recommended/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deleteAddEndpoint = `${API}/user/recommended/${slug}`;
    }

    return fetch(`${deleteAddEndpoint}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateAdd = (add, token, slug) => {
    let updateAddEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updateAddEndpoint = `${API}/recommended/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updateAddEndpoint = `${API}/user/recommended/${slug}`;
    }

    return fetch(`${updateAddEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: add
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listSearch = params => {
    console.log('search params', params);
    let query = queryString.stringify(params);
    console.log('query params', query);
    return fetch(`${API}/recommendeds/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
