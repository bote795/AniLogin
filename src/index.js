var anilistProvider = require('./providers/anilist');
var myanimelistProvider = require('./providers/myanimelist');
/**
 * AniLogin description
 * @param {String} provider   [provider to use]
 * @param {[type]} params [description]
 */
function AniLogin(provider)
{
    const login;
    switch (provider)
    {
        'myanimelist':
        //check for params
            if (arguments.length != 3)
            {
                throw new Error("Not enough arguments");
            }
        var username = arguments[1];
        var pass = arguments[2];
        login = new myanimelistProvider(username, pass);
        break;
        'anilist':
        //check for params
            if (arguments.length != 4)
            {
                throw new Error("Not enough arguments");
            }
        var user_info = arguments[1];
        save = arguments[2];
        login = new anilistProvider(anilistKeys.client, user_info, code, save);
        break;
    }
    return login;
}


module.exports = AniLogin;
