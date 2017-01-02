'use strict';

const isExpired = require('./util').isExpired;
const fetch = require('isomorphic-fetch');
const debug = require('debug')('anilogin:request');

let request = function(url, query, opts = {})
{
    debug(
        `Requesting ${url} with. Query ${query}`
    );
    let fullQuery = `${url + query}`;

    return fetch(fullQuery, opts)
        .then(response =>
        {
            if (response.status === 404 || response.status === 500)
            {
                debug(`status: ${response.status}`);
                throw new Error('Bad query');
            }

            if (response.status === 401)
            {
                throw new Error('Token does not exist or has expired');
            }

            return response.json();
        })
        .catch(err => 
        {
            return Promise.reject(err);
        });
};

module.exports = request;


//https://anilist.co/api/auth/authorize?grant_type=authorization_pin&client_id=bote795-nuwwf&response_type=pin
//https://anilist.co/api/auth/authorize?grant_type=authorization_code&client_id=bote795-nuwwf&redirect_uri=&response_type=code
