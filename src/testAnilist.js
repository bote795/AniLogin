 var anilistProvider = require('./providers/anilist');
 const anilistKeys = require('./secrets.js');
 const debug = require('debug')('anilogin:test');
 debug("create anilist client");
 //https://anilist.co/api/auth/authorize?grant_type=authorization_pin&client_id=bote795-jhv68&response_type=pin
 const anilistclient = new anilistProvider(anilistKeys.client, 'bote795', "kW1gYElZ1HHbRL3HWrlnjSx8Lf4gqa7hBD1HTHJE");
 
/* debug("authenticate pin");
 anilistclient.authenticate()
 */

 //add a way to not add the code and just load up the refresh key
/* debug("lets get token refresh");
 anilistclient.getRefreshToken();*/


debug("retrieve user list for user");
anilistclient.getAnimeList().then(data =>{
	console.log(JSON.stringify(data));
});
