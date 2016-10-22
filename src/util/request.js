'use strict';

const isExpired = require('./utils').isExpired;
const fetch = require('isomorphic-fetch');
const debug = require('debug')('anilogin:request');

let request = function(url, query, opts = {})
{
    debug(
        `Requesting ${url} with. Query ${query}`,
    );
    let fullQuery = `${url + query}`;

    return fetch(fullQuery, opts)
        .then(response =>
        {
            if (response.status === 404 || response.status === 500)
            {
                throw new Error('Bad query');
            }

            if (response.status === 401)
            {
                throw new Error('Token does not exist or has expired');
            }

            return response.json();
        });
};

module.exports = request;
