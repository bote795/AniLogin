require('dotenv').config();
const credentials = {
    anilist:
    {
        client:
        {
            _id: process.env.ANILIST_CLIENT_ID,
            _secret: process.env.ANILIST_CLIENT_SECRET
        }
    },
    myAnimeList:
    {
        client:
        {
            _id: process.env.MYANIMELIST_CLIENT_ID,
            _secret: process.env.MYANIMELIST_CLIENT_SECRET
        }
    }
};

module.exports = credentials;
