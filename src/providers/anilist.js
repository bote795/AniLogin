'use strict';

const request = require('./../util/request');
const isExpired = require('./../util/util').isExpired;
const debug = require('debug')('anilogin:object');
const writeToFile = require('./../util/util').writeToFile;
const querystring = require('query-string'),
    fs = require('fs'),
    path = require('path');
const test = true; //local debug only
const start_path = "./../"
const fileName = path.join(__dirname, start_path, "password");
const refreshFileName = path.join(__dirname, start_path, "refresh_token");
//AnilistProvider 
class AnilistProvider
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
        Params:
        client Example:
        {
          _id: client_id,
          _secret: client_secret,
        }
        user_info: 
        {
            username: String,
            code: String,
            refresh_token: {
                expires: Num,
                token: String               
            }

        }
     */
    constructor(client, user_info, save)
    {
        debug("in constructor");
        this._client = Object.assign(
        {}, client);
        debug(this._client);
        this._baseAPIURL = "https://anilist.co/api/";
        this._user = {};
        this._user._username = user_info.username;
        //pin code
        this._code = user_info.code;

        if (typeof user_info.refresh_token !== "undefined")
        {
            this.setTokens(user_info.refresh_token);
        }
        //saving function
        this.save = save;
    }


    //GET: user/{id || displayname}/animelist
    getAnimeList(username = this._user._username)
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

    deleteAnime(id)
    {

        return this._delete(`animelist/${id}`);
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
    getRefreshToken()
    {
        var self = this;
        return this._refreshToken()
            .then(data =>
            {
                self._accessToken = data.token;
                self._expires = data.expires;
                return {};
            })
            .then(result =>
            {
                if (test)
                    this._save(refreshFileName);
                return 'success';
            })
            .catch(err =>
            {
                debug(`error in getRefreshToken`);
                debug(err);
                Promise.reject(`error in getRefreshToken`);
            });
    }
    _refreshToken()
        {
            if (!this._client._id || !this._client._secret || !this._refresh_token)
            {
                return Promise.reject(new Error('Missing Parameters'));
            }
            let formData = {
                grant_type: 'refresh_token',
                client_id: this._client._id,
                client_secret: this._client._secret,
                refresh_token: this._refresh_token,
            };
            let opts = {
                method: 'post',
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: querystring.stringify(formData)
            };
            debug(`Asking for for refreshToken Anilist's API`);
            return request(this._baseAPIURL, "auth/access_token", opts)
                .then(result =>
                {
                    var date = new Date();
                    debug(`result of refresh_token ${JSON.stringify(result)}`)
                    return {
                        token: result.access_token,
                        expires: date.getTime() + 3600,
                        refresh_token: result.refresh_token
                    }
                })
                .catch(err =>
                {
                    debug(err);
                    return Promise.reject(err);
                });
        }
        //authetnicates token that is passed to retrieve token to be able to start acting as user from
        //normal pin from webstei
        //Request access token
    authenticate()
    {
        var self = this;
        return this._authenticate()
            .then(data =>
            {
                debug(`request went through`);
                self._accessToken = data.token;
                self._expires = data.expires;
                self._refresh_token = data.refresh_token;
            })
            .then(result =>
            {
                if (test)
                    this._save(fileName);
                return "success";
            })
            .catch(err =>
            {
                return Promise.reject("Error Authenticating");
                debug(`There was an error authenticating`);
            });
    }
    _authenticate()
    {
        if (!this._client._id || !this._client._secret || !this._code)
        {
            return Promise.reject(new Error('Missing Parameters to authenticate'));
        }
        let formData = {
            grant_type: 'authorization_pin',
            client_id: this._client._id,
            client_secret: this._client._secret,
            code: this._code
        };
        let opts = {
            method: 'post',
            headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: querystring.stringify(formData)
        };
        debug(JSON.stringify(opts.body))
        debug(`Authenticating user with Anilist's API`);
        return request(this._baseAPIURL, "auth/access_token", opts)
            .then(result =>
            {
                if (result.error)
                {
                    return Promise.reject(result.error.error_description)
                }
                var date = new Date();
                return {
                    token: result.access_token,
                    expires: date.getTime() + 3600,
                    refresh_token: result.refresh_token
                }
            })
            .catch(err =>
            {
                debug(err);
                return Promise.reject(err);
            });
    }
    _get(query, opts = {
        method: 'get'
    })
    {
        debug(`Requesting ${query}`)
        return this._request(query, opts);
    }
    _delete(query, opts = {
        method: 'delete'
    })
    {
        debug(`Requesting ${query}`)
        return this._request(query, opts);
    }
    _post(query, formData)
    {
        debug(`Posting in Anilist's API at ${query}`);
        let opts = {
            method: 'post',
            body: querystring.stringify(formData)
        };
        return this._request(query, opts);
    }
    _put(query, formData)
    {
        debug(`Put in Anilist's API at ${query}`);
        let opts = {
            method: 'put',
            body: querystring.stringify(formData)
        };
        return this._request(query, opts);
    }
    _request(query, opts)
        {
            let token = this._accessToken;
            let expires = this._expires;
            let self = this;
            //this class uses tokens

            if (!token)
            {
                return Promise.reject(new Error('Token does not exist'));
            }
            opts.headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            return request(this._baseAPIURL, query, opts)
                .catch(error =>
                {
                    if (error.message !== 'Token does not exist or has expired')
                    {
                        return Promise.reject(error);
                    }
                    else
                    {
                        debug(`request error: ${error.message}`);
                        return self.getRefreshToken()
                            .then(() => self._request(query, opts));
                    }
                });
        }
        //will take in a promise that will take in the data
        //that needs to be saved and will be saved
        //however the passed in promise handles it
    _save(fn)
    {
        let temp = {
            access_token: this._accessToken,
            expires: this._expires,
            refresh_token: this._refresh_token
        }
        debug(temp);
        this.save(fn, temp);

    }
    setTokens(parsedData)
    {
        if (parsedData.access_token)
            this._accessToken = parsedData.access_token;
        if (parsedData.expires)
            this._expires = parsedData.expires;
        if (parsedData.refresh_token)
            this._refresh_token = parsedData.refresh_token;
    }

}
module.exports = AnilistProvider;
