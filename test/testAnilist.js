 import 'babel-polyfill'
 var anilistProvider = require('./../src/providers/anilist');
 const anilistKeys = require('./../src/secrets.js').anilist;
 const writeToFile = require('./../src/util/util').writeToFile,
     fs = require('fs');
 const debug = require('debug')('anilogin:test');
 var chai = require('chai');
 var expect = chai.expect; // we are using the "expect" style of Chai
 debug("create anilist client");

 //save data to file
 function save(fn, data)
 {
     debug(`save file into: ${fn}`)
     writeToFile(fn, JSON.stringify(data));
     return Promise.resolve();
 }

 //https://anilist.co/api/auth/authorize?grant_type=authorization_pin&client_id=bote795-jhv68&response_type=pin
 const anilistclient = new anilistProvider(anilistKeys.client, 'bote795', "kW1gYElZ1HHbRL3HWrlnjSx8Lf4gqa7hBD1HTHJE", save);

 describe('anilogin', function()
 {


     // it("authenticate() authenticate pin that was rerieved by user", async function()
     // {
     //     const anilistLogin = new anilistProvider(anilistKeys.client, 'bote795', "kW1gYElZ1HHbRL3HWrlnjSx8Lf4gqa7hBD1HTHJE", save);

     //     //expect(cartSummary.getSubtotal()).to.equal(0);
     //     const result = await anilistLogin.authenticate();
     //     expect(result).to.equal(`success`);
     // });
     it('authenticate() fail authenticate pin', async function()
     {
         try
         {
             const result = await anilistclient.authenticate();
         }
         catch (e)
         {
             expect(e).to.equal("Error Authenticating");
         }
     });

     it('getRefreshToken() retrieve a refresh token', async function()
     {
         const result = await anilistclient.getRefreshToken();

         expect(result).to.equal(`success`);
     });


     // it('getRefreshToken() fail retrieve a refresh token', async function()
     // {
     //     const result = await anilistclient.getRefreshToken()
     //     expect(result).to.equal(`error in getRefreshToken`);
     // });
     it('getAnimeList() retrieve user list', async function()
     {
         const result = await anilistclient.getAnimeList();
         expect(result).to.have.property('lists');
     });
     it('searchAnimes() search for attack on titan', async function()
     {
         const result = await anilistclient.searchAnimes("attack on titan");
         expect(result).to.have.length.above(1);
         expect(result[0]).to.have.property('title_english', "Attack on Titan");
     });
     it('addAnime() add Tachumaru Gekijou anime to watching list', async function()
     {
         const result = await anilistclient.addAnime(9562,
         {
             list_status: "watching"
         });
         expect(result).to.have.property('series_id', 9562);
         expect(result).to.have.property('list_status', "watching");
     });
     it('updateAnime() change ep watched number for Tachumaru Gekijou to ep 1', async function()
     {
         const result = await anilistclient.updateAnime(9562,
         {
             episodes_watched: 1
         });
         expect(result).to.have.property('series_id', 9562);
         expect(result).to.have.property('episodes_watched', 1);
     });
     it('deleteAnime() delete Tachumaru Gekijou', async function()
     {
         const result = await anilistclient.deleteAnime(9562);
         expect(result).to.equal(1);
     });
 });
