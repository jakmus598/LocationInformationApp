var express = require('express')
var passport = require('passport')
var TwitterStrategy = require('passport-twitter').Strategy
//var keys = require('./config/keys')
var session = require('express-session')
var fetch = require('node-fetch')
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var xhr = new XMLHttpRequest()
var jsonParser = require('parse-json')
var cors = require('cors')
var crypto = require('crypto')

/**
 * Set up MongoDB connection
 */
/**var mongoose = require('mongoose')
require('./Models/User')
var mongoDB = 'mongodb://127.0.0.1/LocationWizardUsers'
mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true})
*/
//mongoose.connect(mongoDB, {useNewUrlParser: true})
//console.log(mongoose.connection)


const PORT = process.env.PORT || 5000
//const PORT = 5000
/**const TICKETMASTER_API_KEY = keys.TICKETMASTER_API
const YELP_API_KEY = keys.YELP_API_KEY
const YELP_CLIENT_ID = keys.YELP_CLIENT_ID
const TWITTER_CONSUMER_KEY = keys.TWITTER_CONSUMER_KEY 
const TWITTER_CONSUMER_SECRET = keys.TWITTER_CONSUMER_SECRET
const TWITTER_ACCESS_TOKEN = keys.TWITTER_ACCESS_TOKEN
const TWITTER_TOKEN_SECRET = keys.TWITTER_TOKEN_SECRET
*/

const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY
const YELP_API_KEY = process.env.YELP_API_KEY
const YELP_CLIENT_ID = process.env.YELP_CLIENT_ID
const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY 
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN
const TWITTER_TOKEN_SECRET = process.env.TWITTER_TOKEN_SECRET
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN
const YAHOO_CONSUMER_KEY = process.env.YAHOO_CONSUMER_KEY
const YAHOO_CONSUMER_SECRET = process.env.YAHOO_CONSUMER_SECRET


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
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    accessToken: TWITTER_ACCESS_TOKEN,
    tokenSecret: TWITTER_TOKEN_SECRET,
    //callbackURL - Where user is redirected to after request is confirmed
    callbackURL: '/login/twitter' 
}, //(accessToken) => console.log(accessToken)))
function(accessToken, tokenSecret, profile, done) {
    console.log(profile)
    //User.findOrCreate(..., function(err, user) {
      //if (err) { return done(err); }
      //done(null, user);
    //});
  }
))

/**
 * A function to parse Yelp data
 */
function parseYelp(jsonRes)
{
  var information = []
  for(var i in jsonRes['businesses'])
  {
    var name = jsonRes['businesses'][i]['name']
    var address = jsonRes['businesses'][i]['location']['address1']
    var cityState = jsonRes['businesses'][i]['location']['city'] + ', ' + jsonRes['businesses'][i]['location']['state']
    var url = jsonRes['businesses'][i]['url']
    information.push({'name': name, 'address': address, 'cityState': cityState, 'url': url})
  }
  return information
}


app.get('/login/twitter', passport.authenticate('twitter'))

app.get('/weather', async (req, res) => {

/**
 * Taken from https://www.npmjs.com/package/oauth-1.0a
 */

})

/**
   * Parses events so that necessary event information is returned
   */
  function parseEvents(jsonRes)
  {
    //Put the necessary key/value pairs into an array and return it
    var eventInformation = []
    if(!jsonRes['_embedded'])
    {
      console.log(jsonRes)
    }
    for(var i in jsonRes['_embedded']['events'])
    {

      //Get name, url to buy tickets
      name = jsonRes['_embedded']['events'][i]['name']
      url = jsonRes['_embedded']['events'][i]['url']

      //Modify date so that it appears in month/day format (excludes year)
      date = jsonRes['_embedded']['events'][i]['dates']['start']['localDate']
      date = convertDate(date)
      
      //Get time and convert it from military
      time = jsonRes['_embedded']['events'][i]['dates']['start']['localTime']
      time = convertTime(time)

      //Store all information in a single Object
      var basicInformation = {'name': name, 'url': url, 'date': date, 'time': time}
      //'date': date, 'time': time}
      eventInformation.push(basicInformation)
    }
    return eventInformation
  }

app.get('/trendingTweets', async (req, res) => {
  //TODO: Use Yahoo database to obtain user's WOEID
  var fetchTweets = await fetch('https://api.twitter.com/1.1/trends/place.json?id=2379574', {
  headers: {'Authorization': 'Bearer ' + TWITTER_BEARER_TOKEN}})

  var jsonRes = await fetchTweets.json()

  //Parse the JSON accordingly
  var tweetInformation = []
  for(var i in jsonRes[0]['trends'])
  {
    var name = jsonRes[0]['trends'][i]['name']
    var url = jsonRes[0]['trends'][i]['url']
    tweetInformation.push({'name': name, 'url': url})
  }
  return res.send(tweetInformation)

})

app.get('/places/gyms', async(req, res) => {

  var fetchResGyms = await fetch('https://api.yelp.com/v3/businesses/search?categories=gyms&location=60015', {
    headers: {'Authorization': 'Bearer ' + YELP_API_KEY}})

  var jsonRes = await fetchResGyms.json()

  //Parse the JSON accordingly
  var gymInformation = []
  for(var i in jsonRes['businesses'])
  {
    var name = jsonRes['businesses'][i]['name']
    var rating = jsonRes['businesses'][i]['rating']
    var url = jsonRes['businesses'][i]['url']
    gymInformation.push({'name': name, 'rating': rating, 'url': url})
  }

  return res.send(gymInformation)

})

app.get('/places/outdoors/playgrounds', async(req, res) => {

  var fetchResGyms = await fetch('https://api.yelp.com/v3/businesses/search?categories=playgrounds&location=60015', {
    headers: {'Authorization': 'Bearer ' + YELP_API_KEY}})

  var jsonRes = await fetchResGyms.json()

  //Parse the JSON accordingly
  var playgroundInformation = []
  for(var i in jsonRes['businesses'])
  {
    var name = jsonRes['businesses'][i]['name']
    var rating = jsonRes['businesses'][i]['rating']
    var url = jsonRes['businesses'][i]['url']
    playgroundInformation.push({'name': name, 'rating': rating, 'url': url})
  }

  return res.send(playgroundInformation)

})


//TODO: Create method to obtain WOEID
//Note: this will have to be done by parsing HTML (no endpoint for WOEIDs directly)
app.get('/weather', async(req, res) => {
var fetchWeather = await fetch

})


//Parse JSON from TicketMaster to isolate necessary information
app.get('/events', async (req, res, error) => {
    //Get the response of making the API call to TicketMaster
    //TODO: Obtain city name from entered zip code (allows for better results in this API)
    var fetchResTicketMaster = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=' + TICKETMASTER_API_KEY + 
    '&city=Chicago&stateCode=IL&endDateTime=2020-02-25T12:00:00Z')
    //TODO: Get it working so that it sorts by date &sort=date,asc')
    //&city=Chicago&stateCode=IL&sort=date,asc
    //Conert that response to a JSON object (returns a promise)
    var jsonRes = await fetchResTicketMaster.json()
    var eventInformation = parseEvents(jsonRes)
    return res.send(eventInformation)
})

  app.get('/events/music', async (req, res, error) => {
    //Get the response of making the API call to TicketMaster
    //TODO: Obtain city name from entered zip code (allows for better results in this API)
    var fetchResTicketMaster = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=' + TICKETMASTER_API_KEY + 
    '&city=Chicago&stateCode=IL&endDateTime=2020-02-25T12:00:00Z&classificationName=music')
    //TODO: Get it working so that it sorts by date &sort=date,asc')
    //&city=Chicago&stateCode=IL&sort=date,asc
    //Conert that response to a JSON object (returns a promise)
    var jsonRes = await fetchResTicketMaster.json()
    var eventInformation = parseEvents(jsonRes)
    return res.send(eventInformation)
})

app.get('/events/sports', async (req, res, error) => {
  //Get the response of making the API call to TicketMaster
  //TODO: Obtain city name from entered zip code (allows for better results in this API)
  var fetchResTicketMaster = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=' + TICKETMASTER_API_KEY + 
  '&city=Chicago&stateCode=IL&endDateTime=2020-02-25T12:00:00Z&classificationName=Sports')
  //TODO: Get it working so that it sorts by date &sort=date,asc')
  //&city=Chicago&stateCode=IL&sort=date,asc
  //Conert that response to a JSON object (returns a promise)
  var jsonRes = await fetchResTicketMaster.json()
  var eventInformation = parseEvents(jsonRes)
  return res.send(eventInformation)
})

app.get('/events/arts', async (req, res, error) => {
    //Get the response of making the API call to TicketMaster
  //TODO: Obtain city name from entered zip code (allows for better results in this API)
  var fetchResTicketMaster = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=' + TICKETMASTER_API_KEY + 
  '&city=Chicago&stateCode=IL&endDateTime=2020-02-25T12:00:00Z&classificationName=arts')
  //TODO: Get it working so that it sorts by date &sort=date,asc')
  //&city=Chicago&stateCode=IL&sort=date,asc
  //Conert that response to a JSON object (returns a promise)
  var jsonRes = await fetchResTicketMaster.json()
  var eventInformation = parseEvents(jsonRes)
  return res.send(eventInformation)
})

app.get('/events/family', async(req, res, error) => {

  var fetchResTicketMaster = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=' + TICKETMASTER_API_KEY + 
  '&city=Chicago&stateCode=IL&endDateTime=2020-02-25T12:00:00Z&classificationName=Family')
  var jsonRes = await fetchResTicketMaster.json()
  var eventInformation = parseEvents(jsonRes)
  return res.send(eventInformation)
})

app.get('/bars', async(req, res, error) => {
  var fetchResBars = await fetch('https://api.yelp.com/v3/businesses/search?categories=bars&location=60015', {
    headers: {'Authorization': 'Bearer ' + YELP_API_KEY}})

  var jsonRes = await fetchResBars.json()

  //Parse the JSON accordingly
  var barInformation = []
  return res.send(parseYelp(jsonRes))
})

app.get('/bars/pubs', async(req, res, error) => {
  var fetchResBars = await fetch('https://api.yelp.com/v3/businesses/search?categories=irish_pubs&location=60015', {
    headers: {'Authorization': 'Bearer ' + YELP_API_KEY}})

  var jsonRes = await fetchResBars.json()

  //Parse the JSON accordingly
  var barInformation = []
  return res.send(parseYelp(jsonRes))
})

app.get('/bars/sportsbars', async(req, res, error) => {
  var fetchResBars = await fetch('https://api.yelp.com/v3/businesses/search?categories=sportsbars&location=60015', {
    headers: {'Authorization': 'Bearer ' + YELP_API_KEY}})

  var jsonRes = await fetchResBars.json()

  //Parse the JSON accordingly
  var barInformation = []
  return res.send(parseYelp(jsonRes))
}) 

app.get('/bars/winebars', async(req, res, error) => {
  var fetchResBars = await fetch('https://api.yelp.com/v3/businesses/search?categories=wine_bars&location=60015', {
    headers: {'Authorization': 'Bearer ' + YELP_API_KEY}})

  var jsonRes = await fetchResBars.json()

  //Parse the JSON accordingly
  var barInformation = []
  return res.send(parseYelp(jsonRes))
})

app.get('/clubs/socialclubs', async(req, res, error) => {
  var fetchResClubs = await fetch('https://api.yelp.com/v3/businesses/search?categories=social_clubs&location=60015', {
    headers: {'Authorization': 'Bearer ' + YELP_API_KEY}})

  var jsonRes = await fetchResClubs.json()

  //Parse the JSON accordingly
  var clubInformation = []
  return res.send(parseYelp(jsonRes))
})

app.get('/clubs/comedyclubs', async(req, res, error) => {
  var fetchResClubs = await fetch('https://api.yelp.com/v3/businesses/search?categories=comedyclubs&location=60015', {
    headers: {'Authorization': 'Bearer ' + YELP_API_KEY}})

  var jsonRes = await fetchResClubs.json()

  //Parse the JSON accordingly
  var clubInformation = []
  return res.send(parseYelp(jsonRes))
})

app.get('/clubs/danceclubs', async(req, res, error) => {
  var fetchResClubs = await fetch('https://api.yelp.com/v3/businesses/search?categories=danceclubs&location=60015', {
    headers: {'Authorization': 'Bearer ' + YELP_API_KEY}})

  var jsonRes = await fetchResClubs.json()

  //Parse the JSON accordingly
  var clubInformation = []
  return res.send(parseYelp(jsonRes))
})

app.get('/clubs/jazzclubs', async(req, res, error) => {
  var fetchResClubs = await fetch('https://api.yelp.com/v3/businesses/search?categories=jazzandblues&location=60015', {
    headers: {'Authorization': 'Bearer ' + YELP_API_KEY}})

  var jsonRes = await fetchResClubs.json()

  //Parse the JSON accordingly
  var clubInformation = []
  return res.send(parseYelp(jsonRes))
})





    //Get Yelp event information
    /**var fetchYelpEvents = await fetch('https://api.yelp.com/v3/events?location=60015', {
      headers: {'Authorization': 'Bearer ' + YELP_API_KEY}})
    var jsonResYelp = await fetchYelpEvents.json()

    //Parse Yelp JSON
    for(var i in jsonResYelp['events'])
    {
      eventURL = jsonResYelp['events'][i]['event_site_url']
    }
    */

    /**var fetchYelpEvents = await fetch('https://api.yelp.com/v3/events/search?location=60015', {
      headers: {'Authorization': 'Bearer ' + keys.yelpAPIKey}})
    var yelpJSONRes = */


  

  app.get('/places/restaurants', async(req, res) => {
    //TODO: Allow users to specify radius (entire application?)
    //TODO: Allow filtering
    var fetchRes = await fetch('https://api.yelp.com/v3/businesses/search?categories=restaurants&location=60015', {
    headers: {'Authorization': 'Bearer ' + YELP_API_KEY}})
    var jsonRes = await fetchRes.json()
    //res.send(jsonRes)
    //res.send(jsonRes['businesses'][1]['name'])
    //Parse JSON
    var restaurants = []
    for(var i in jsonRes['businesses'])
    {
      //The current element of jsonRes['businesses'] array
      var currentValue = jsonRes['businesses'][i]
      //var url= {''name': jsonRes['businesses'][i]['name']}'
      var restInformation = {'url': currentValue['url'], 'name': currentValue['name'], 'alias': currentValue['alias']}
      restaurants.push(restInformation)
    }
    return res.send(restaurants)
  })

  /**app.get('/news', async(req, res) => {
    var 


  })
  */



  /**
   * Converts from military to standard time
   * Note: the majority of this method was taken from:
   * https://stackoverflow.com/questions/29206453/best-way-to-convert-military-time-to-standard-time-in-javascript
   */
  function convertTime(time)
  {
    time = time.split(':'); // convert to array

    // fetch
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);

    // calculate
    var timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue= "" + hours;
    } else if (hours > 12) {
      timeValue= "" + (hours - 12);
    } else if (hours == 0) {
      timeValue= "12";
    }
    
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    //timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
    timeValue += (hours >= 12) ? " pm" : " am";  // get AM/PM

    return timeValue
  }

  /**
   * Converts dates to month/day format
   */
  function convertDate(date)
  {
    date = date.split("-")

    var month = date[1]
    var day = date[2]

    return (month + "/" + day)
  }

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
