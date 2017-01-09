`use strict`;
const debug = require('debug')('myanimelist:object');
const popura = require('popura');

class MyAnimeListProvider
{
	constructor(username,  password)
    {
    	debug("in constructor");
    	this.client = popura(username, password);
    }

    getAnimeList()
    {
        return this.client.getAnimeList();
    }
    addAnime(id, values = {})
    {
    	return this.client.addAnime(id,values);
    }
    updateAnime(id, values = {})
    {
    	return this.client.updateAnime(id,values);
    }
    searchAnimes(name)
    {
    	return this.client.searchAnimes(name);
    }
}
module.exports = MyAnimeListProvider;
