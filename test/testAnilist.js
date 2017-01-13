 var anilistProvider = require('./../src/providers/anilist');
 const anilistKeys = require('./../src/secrets.js').anilist;
 const writeToFile = require('./../src/util/util').writeToFile,
 	   fs           = require('fs');
 const debug = require('debug')('anilogin:test');
 debug("create anilist client");

//save data to file
function save (fn, data)
{
	debug(`save file into: ${fn}`)
	writeToFile(fn, JSON.stringify(data));
	return Promise.resolve();
}


 //https://anilist.co/api/auth/authorize?grant_type=authorization_pin&client_id=bote795-jhv68&response_type=pin
 const anilistclient = new anilistProvider(anilistKeys.client, 'bote795',"kW1gYElZ1HHbRL3HWrlnjSx8Lf4gqa7hBD1HTHJE", save);
 
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


/*debug("search for attack on titan")
anilistclient.searchAnimes("attack on titan").then(data =>{
	console.log(JSON.stringify(data));
});*/

/*debug("add chaos;child anime to watching list")
anilistclient.updateAnime(21126,{list_status: "watching"}).then(data=>{
	console.log(JSON.stringify(data));
});
*/

/*debug("change ep watched number for blue exorcist to ep 1")
anilistclient.updateAnime(21861,{episodes_watched: 0}).then(data=>{
	console.log(JSON.stringify(data));
});*/