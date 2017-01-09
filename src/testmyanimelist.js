var myanimelistProvider = require('./providers/myanimelist');
const myAnimeListKeys = require('./secrets.js').myAnimeList;
const debug = require('debug')('myanimelist:test');

const myanimelistclient = new myanimelistProvider(myAnimeListKeys.client._id, myAnimeListKeys.client._secret);

/*debug("retrieve user list for user");
myanimelistclient.getAnimeList().then(data =>{
	console.log(JSON.stringify(data));
});*/


/*debug("search for attack on titan")
myanimelistclient.searchAnimes("attack on titan").then(data =>{
	console.log(JSON.stringify(data));
});*/

//TODO fix add anime it works but returns error
debug("add chaos;child anime to watching list")
myanimelistclient.addAnime(30485,{status: "watching"}).then(data=>{
	console.log(JSON.stringify(data));
});


/*debug("change ep watched number for blue exorcist to ep 1")
myanimelistclient.updateAnime(30485,{episode: 0}).then(data=>{
	console.log(JSON.stringify(data));
});*/