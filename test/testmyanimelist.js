var myanimelistProvider = require('./../src/providers/myanimelist');
const myAnimeListKeys = require('./../src/secrets.js').myAnimeList;
const debug = require('debug')('myanimelist:test');

//const myanimelistclient = new myanimelistProvider(myAnimeListKeys.client._id, myAnimeListKeys.client._secret);

/* debug("authenticate make sure credentials are correct");
 myanimelistclient.authenticate().then(data =>{
	console.log(JSON.stringify(data));
});*/



/*debug("retrieve user list for user");
myanimelistclient.getAnimeList().then(data =>{
	console.log(JSON.stringify(data));
});*/


/*debug("search for attack on titan")
myanimelistclient.searchAnimes("attack on titan").then(data =>{
	console.log(JSON.stringify(data));
});*/

//fixed but issue in npm package
/*debug("add Kono Subarashii to watching list")
myanimelistclient.addAnime(32937,{status: "watching"}).then(data=>{
	console.log(JSON.stringify(data));
})
.catch(err=>{
	console.log(err);
});
*/


/*debug("change ep watched number for blue exorcist to ep 1")
myanimelistclient.updateAnime(30485,{episode: 0}).then(data=>{
	console.log(JSON.stringify(data));
});*/
