var anilistProvider = require('./providers/anilist');
var myanimelistProvider = require('./providers/myanimelist');
var anilistKeys = require('./../src/secrets.js').anilist;
/**
 * AniLogin description
 * @param {String} provider   [provider to use]
 * @param {[type]} params [description]
 */
function AniLogin(provider)
{
    var login;

    switch (provider)
    {
        case 'myanimelist':
            //check for params
            if (arguments.length != 3)
            {
                throw new Error("Not enough arguments");
            }
            var username = arguments[1];
            var pass = arguments[2];
            login = new myanimelistProvider(username, pass);
            break;
        case 'anilist':
            //check for params
            //for client side have them pass the client secrets as a param
            //if node module read from .env file
            var user_info;
            var save;
            if (!anilistKeys._id)
            {
                if (arguments.length != 4)
                {
                    throw new Error("Not enough arguments");
                }
                anilistKeys = arguments[1];
                user_info = arguments[2];
                save = arguments[3];
            }
            else
            {
                if (arguments.length != 3)
                {
                    throw new Error("Not enough arguments");
                }
                user_info = arguments[1];
                save = arguments[2];
            }

            login = new anilistProvider(anilistKeys.client, user_info, save);
            break;
    }
    return login;
}


module.exports = AniLogin;
