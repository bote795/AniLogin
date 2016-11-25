import anilistProvider from './providers/anilist';
const anilistKeys = require('./secrets.js');

//https://anilist.co/api/auth/authorize?grant_type=authorization_pin&client_id=bote795-jhv68&response_type=pin
const anilistclient = new anilistProvider(anilistKeys.client, 'bote795', "7oZ8qkC4Cd5NkKUu3dWTxDsYetUKo4wHjdDFiiWc");
//add a way to not add the code and just load up the refresh key

anilistclient.getRefreshToken();
