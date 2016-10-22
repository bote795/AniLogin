//AnilistProvider 
class AnilistProvider
{
    /**
     * this._username
     * this._id
     * this._password (optional)
     * this._authToken
     * this._baseAPIURL
     */
    constructor()
    {
        this._baseAPIURL = "https://anilist.co/api/";
    }

    //GET: user/{id || displayname}/animelist
    getAnimeList(username = this._user)
    {

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

    }

    //GET: anime/search/{query}
    searchAnimes(name)
    {

    }
}
