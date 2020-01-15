var express = require('express')
var passport = require('passport')
var TwitterStrategy = require('passport-twitter').Strategy
var keys = require('./config/keys')
var session = require('express-session')
var fetch = require('node-fetch')
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var xhr = new XMLHttpRequest()
var jsonParser = require('parse-json')
var cors = require('cors')


const PORT = process.env.PORT || 5000

//fetch.fetchUrl('https://app.ticketmaster.com/discovery/v2/events.json?apikey=OUUIbGtTXR1GAlGkkWRKIfK6cNG7ydBc&postalCode=60612', function(meta, error, body){ console.log(meta.toString())})

var apiCallbacks = {twitterURL: 'https://api.twitter.com/1.1/trends/place.json?id=2379574'}
var app = express()
app.use(cors())
app.listen(PORT, () => {console.log('Listening')})
app.get('/jg', (req, res) => {res.send('Hi')})
var OAuth = require('oauth')

//var url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=OUUIbGtTXR1GAlGkkWRKIfK6cNG7ydBc&postalCode=60612'
//xhr.open('GET', url, false)
//xhr.send(null)

//console.log(xhr.responseText)

//Configure app
app.use(express.static('public'));
//app.use(express.cookieParser());
//app.use(express.bodyParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());



  
/**var credentials = {
    client: 
    {
        id: keys.twitterConsumerKey,
        secret: keys.twitterConsumerSecret
    },
    auth:
    {
        tokenHost: 'https://api.twitter.com/1.1'
    }
        
}   

var oauth2 = require('simple-oauth2').create(credentials)

var authorizationURI = oauth2.authorizationCode.authorizeURL({
    redirect_uri: 'https://www.google.com'
    //scope: '<scope>', // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
    //state: '<state>'
})

// Get the access token object (the authorization code is given from the previous step).
const tokenConfig = {
    code: keys.tw,
    redirect_uri: 'http://localhost:3000/callback',
    scope: '<scope>', // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
  };
   
  // Optional per-call http options
  const httpOptions = {};
   
  // Save the access token
  try {
    const result = await oauth2.authorizationCode.getToken(tokenConfig, httpOptions);
    const accessToken = oauth2.accessToken.create(result);
  } catch (error) {
    console.log('Access Token Error', error.message);
  }
  **/

  //USER AUTHENTICATION WITH TWITTER
passport.use(new TwitterStrategy({
    consumerKey: keys.twitterConsumerKey,
    consumerSecret: keys.twitterConsumerSecret,
    accessToken: keys.twitterAccessToken,
    tokenSecret: keys.twitterTokenSecret,
    //callbackURL - Where user is redirected to after request is confirmed
    callbackURL: '/trendingTweets' 
}, //(accessToken) => console.log(accessToken)))
function(accessToken, tokenSecret, profile, done) {
    console.log('functikon executed')
    //User.findOrCreate(..., function(err, user) {
      //if (err) { return done(err); }
      //done(null, user);
    //});
  }
))

app.get('/trendingTweets', passport.authenticate('twitter'))


//Parse JSON from TicketMaster to isolate necessary information
app.get('/events', async (req, res, error) => {
    //Get the response of making the API call
    var fetchRes = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=' + keys.ticketMasterAPIKey + 
    '&postalCode=60612')
    //Conert that response to a JSON object (returns a promise)
    var jsonRes = await fetchRes.json()
    //Put the necessary key/value pairs into an array and return it
    var eventInformation = []
    for(var i in jsonRes['_embedded']['events'])
    {
      var nameURLPair = {'name': jsonRes['_embedded']['events'][i]['name'], 'url': jsonRes['_embedded']['events'][i]['url']}
      eventInformation.push(nameURLPair)
    }

    /**var fetchYelpEvents = await fetch('https://api.yelp.com/v3/events/search?location=60015', {
      headers: {'Authorization': 'Bearer ' + keys.yelpAPIKey}})
    var yelpJSONRes = */

    return res.send(eventInformation)
  })
  

  app.get('/food', async(req, res) => {
    //TODO: Allow users to specify radius (entire application?)
    //TODO: Allow filtering
    var fetchRes = await fetch('https://api.yelp.com/v3/businesses/search?location=60015', {
    headers: {'Authorization': 'Bearer ' + keys.yelpAPIKey}})
    var jsonRes = await fetchRes.json()
    //res.send(jsonRes)
    //res.send(jsonRes['businesses'][1]['name'])
    //Parse JSON
    var restaurants = []
    for(var i in jsonRes['businesses'])
    {
      //The current element of jsonRes['businesses'] array
      var currentValue = jsonRes['businesses'][i]
      //var restInformation = {'name': jsonRes['businesses'][i]['name']}
      var restInformation = {'id': currentValue['id'], 'name': currentValue['name'], 'alias': currentValue['alias']}
      restaurants.push(restInformation)
    }
    return res.send(restaurants)
  })

  //app.get('/places', async(req, res) => 




  
    


    //res.send(jsonRes)
    //for(var i in jsonRes[0]['events'])
    //{
      //var nameURLPair = {'name': jsonRes[0]['events'][i]['name'], 'url': jsonRes[0]['events'][i]['url']}
      //eventInformation.push(nameURLPair)
    //}
    
    
    
    //Parse JSON into a string that can be easily read
    //var jsonResString = JSON.stringify(jsonRes)
    //var stringValue = 'asfsdf'
    /**var eventInformation = []
    for (var key in jsonRes)
    {
      if(key === 'name' || key === 'url')
      {
        eventInformation.push(jsonRes[key])
      }
    }

    res.send(eventInformation)
    */
    

    /**JSON.parse(jsonResString, (key, value) => {
      if(key === 'name')
      {
          return value
      }
      else if(key === 'url')
      {
          return value
      }

  })
  */

    //res.send(typeof eventInformation)
    
    


  

    

    
    /**for(i in jsonRes['_embedded']['events'].length - 1)
    {   
        eventInformation.push({jsonRes['_embedded']['events'][i]['name']: jsonRes['_embedded']['events'][i]['name']})
    }
    */
    //console.log(eventInformation)





//app.get('/', () => {return 'Hello'})


    /**var res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
    var json = await res.json()
    console.log(json)
    */



/**async () => {
    var res = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=OUUIbGtTXR1GAlGkkWRKIfK6cNG7ydBc&'
    + 'postalCode=60612')
    res.catch((e) => {console.log('Error occurred')})
    var json = await res.json()
    console.log(json)
})
*/



/** Twitter request
 * var OAuth2 = OAuth.OAuth2;    
 var twitterConsumerKey = 'keys.twitterConsumerKey';
 var twitterConsumerSecret = 'keys.twitterConsumerSecret';
 var oauth2 = new OAuth2(
   twitterConsumerKey,
   twitterConsumerSecret, 
   'https://api.twitter.com/1.1', 
   null,
   'oauth2/token', 
   null);
 oauth2.getOAuthAccessToken(
   '',
   {'grant_type':'client_credentials'},
   function (e, access_token, refresh_token, results){
     console.log('bearer: ',access_token);
     oauth2.get('protected url', 
       access_token, function(e,data,res) {
         if (e) return 'nibba';
         if (res.statusCode!=200) 
           return 'nibba you got an error'
         try {
           data = JSON.parse(data);        
         }
         catch (e){
           return 'error in json nibba'
         }
         return 'nibbaaaaaaaasuccess'
      });
   });



//passport.authenticate calls the strategy specified in passport.use
//'twitter' = internal identifier for TwitterStrategy
//app.get('/trendingTweets', passport.authenticate('twitter'))

//app.get(apiCallbacks.twitterURL, (req, res) => {console.log('Yes')})
app.listen(3000)








/**app.get('/', function(req, res) {
    //response.sendFile('index.html')
    res.send('Hello')
    console.log('app.get(/)')
}   
)

app.get('/cooper', function(request, response) {
    console.log('Cooper Abramson')
})

//For Heroku:
//const PORT = process.env.PORT || 5000
//app.listen(PORT)
app.listen(3000)
*/
