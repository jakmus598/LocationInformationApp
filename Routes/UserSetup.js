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
var sort = require('sort-algorithms')

/**
 * Set up MongoDB connection
 */
var mongoose = require('mongoose')
require('../Models/User')
var mongoDB = 'mongodb://127.0.0.1/LocationWizardUsers'
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})

passport.serializeUser((user, done) => done(null, {profile: user.profile, accessToken: user.accessToken}))

  //USER AUTHENTICATION WITH TWITTER
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    accessToken: TWITTER_ACCESS_TOKEN,
    tokenSecret: TWITTER_TOKEN_SECRET,
    //callbackURL - Where user is redirected to after request is confirmed
    callbackURL: '/auth/twitter'
    //console.log('Callback URL ')
}, //(accessToken) => console.log(accessToken)))
function(accessToken, tokenSecret, profile, done) {
  done(null, {accessToken, profile})
  //console.log('Callback function executed')
    //User.findOrCreate(..., function(err, user) {
      //if (err) { return done(err); }
      //done(null, user);
    //});
  }
))