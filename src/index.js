var anilistProvider = require('./providers/anilist');
var myanimelistProvider = require('./providers/myanimelist');
/**
 * AniLogin description
 * @param {String} provider   [provider to use]
 * @param {[type]} params [description]
 */
function AniLogin(provider) {
	const login;
	switch()
	{
		'anilogin':
			//check for params
			if(arguments.length != 3)
			{
				throw new Error("Not enough arguments");
			}
			var username = arguments[1]; 
			var pass = arguments[2];
			login = new myanimelistProvider(username, pass);
			break;
		'myanimelist':
			//check for params
			if(arguments.length != 4)
			{
				throw new Error("Not enough arguments");
			}
			var username = arguments[1];
			code = arguments[2],
			save = arguments[3];
			login =new anilistProvider(anilistKeys.client, username,code, save);
			break;
	}	
	return login;
}


module.exports = AniLogin;