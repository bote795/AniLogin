'use strict';

const fetch = require('isomorphic-fetch');

let authenticate = function(url, query, params, formData)
{
    //check if params were passed
    //return true or false
    //Example:
    //!id || !secret
    if (ParamsCheck())
    {
        return Promise.reject(new Error('No client ID or secret given'));
    }

    return fetch(`${url}${query}`,
        {
            method: 'post',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(result => result.json())
        .then(result =>
        {
            return result;
        });
};

module.exports = authenticate;
