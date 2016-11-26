 var anilistProvider = require('./providers/anilist');
 const anilistKeys = require('./secrets.js');
 const debug = require('debug')('anilogin:test');
 debug("create anilist client");
 //https://anilist.co/api/auth/authorize?grant_type=authorization_pin&client_id=bote795-jhv68&response_type=pin
 const anilistclient = new anilistProvider(anilistKeys.client, 'bote795', "tGWvVLbzNfNQeUT30AMqWjKry0XOeoJksKfXzyi9");
 //add a way to not add the code and just load up the refresh key
 debug("lets get refresh token");
 anilistclient.getRefreshToken();
