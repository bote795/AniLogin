'use strict';

const request = require('./../util/request');
const isExpired = require('./../utils').isExpired;
const debug = require('debug')('anilogin:object');

//AnilistProvider 
export default class AnilistProvider
{
    /**
     * this._user: {
     *  _username: '',
     *  _id: '',
     * }
     * this._baseAPIURL
     * this._client {
     * this._id
     * this._secret
     * }
     * this._accessToken
     * this._expires
     * this._refresh_token
     * this._code
     */
    /*
        client Example:
        {
          _id: client_id,
          _secret: client_secret,
        }
     */
    constructor(client, username, code)
    {
        this._client = object.assign(
        {}, client);
        this._baseAPIURL = "https://anilist.co/api/";
        this._user._username = username;
        //pin code
        this._code = code;
    }


    //GET: user/{id || displayname}/animelist
    getAnimeList(username = this._user)
    {
        return this._get(`user/${username}/animelist`);
    }

    //id 
    //values = {}
    //POST: animelist
    /*
    Example of values:
    id: (int) anime_id of list item
    list_status: (String) "watching" || "completed" || "on-hold" || "dropped" || "plan to watch"
    score: (See bottom of page - List score types)
    score_raw: (int) 0-100 (See bottom of page - Raw score)
    episodes_watched: (int)
    rewatched: (int)
    notes: (String)
    advanced_rating_scores: comma separated scores, same order as advanced_rating_names
    custom_lists: comma separated 1 or 0, same order as custom_list_anime
    hidden_default: (int) 0 || 1
    */
    addAnime(id, values = {})
    {
        let formData = Object.assign(
        {}, values);
        formData.id = id;
        return this._post(`animelist`, formData);
    }

    //id 
    //values = {}
    //PUT: animelist
    /*
    Example of values:
    id: (int) anime_id of list item
    list_status: (String) "watching" || "completed" || "on-hold" || "dropped" || "plan to watch"
    score: (See bottom of page - List score types)
    score_raw: (int) 0-100 (See bottom of page - Raw score)
    episodes_watched: (int)
    rewatched: (int)
    notes: (String)
    advanced_rating_scores: comma separated scores, same order as advanced_rating_names
    custom_lists: comma separated 1 or 0, same order as custom_list_anime
    hidden_default: (int) 0 || 1
    */
    updateAnime(id, values = {})
    {
        let formData = Object.assign(
        {}, values);
        formData.id = id;
        return this._put(`animelist`, formData);
    }

    //GET: anime/search/{query}
    searchAnimes(name)
    {
        return this._get(`anime/search/${name}`);
    }
    refreshToken()
    {
        return this._refreshToken()
            .then(data =>
            {
                this._accessToken = data.token;
                this._expires = data.expires;
                this._refresh_token = data.refresh_token;
            })
    }
    _refreshToken()
    {
        let formData = {
            grant_type: 'refresh_token',
            client_id: this._client._id,
            client_secret: this._client._secret,
            refresh_token: this._code
        };
        let opts = {
            method: 'post',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        };
        return request(this._baseAPIURL, "auth/access_token", opts)
            .then(result =>
            {
                token: result.access_token,
                expires: result.expires
                refresh_token: result.refresh_token;
            });
    }
    authenticate()
    {
        return this._authenticate()
            .then(data =>
            {
                this._accessToken = data.token;
                this._expires = data.expires;
            })
    }
    _authenticate()
    {
        let formData = {
            grant_type: 'refresh_token',
            client_id: this._client._id,
            client_secret: this._client._secret,
            refresh_token: this._refresh_token
        };
        let opts = {
            method: 'post',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        };
        return request(this._baseAPIURL, "auth/access_token", opts)
            .then(result =>
            {
                token: result.access_token,
                expires: result.expires
            });
    }
    _get(query, opts = {})
    {
        debug(`Requesting ${query}`)
        return this._request(query, opts);
    }
    _post(query, formData)
    {
        debug(`Posting in Anilist's API at ${query}`);
        let opts = {
            method: 'post',
            body: JSON.stringify(formData)
        };
        return this._request(query, opts);
    }
    _put(query, formData)
    {
        debug(`Put in Anilist's API at ${query}`);
        let opts = {
            method: 'put',
            body: JSON.stringify(formData)
        };
        return this._request(query, opts);
    }
    _request(query, opts)
    {
        let token = this._accessToken;
        let expires = this._expires;
        //this class uses tokens

        if (!token || isExpired(expires))
        {
            return Promise.reject(new Error('Token does not exist or has expired'));
        }
        let opts = {
            headers:
            {
                Authorization: `Basic ${token}`,
                'Content-Type': 'application/json'
            }
        };
        return request(this._baseAPIURL, query, opts);
        .catch(error =>
        {
            if (error.message !== 'Token does not exist or has expired')
            {
                throw error;
            }
            else
            {
                return this.authenticate()
                    .then(() => this.request(query, opts));
            }
        });
    }

}
