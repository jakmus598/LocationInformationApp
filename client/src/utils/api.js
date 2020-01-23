import React, {Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom' 
var fetch = require('node-fetch')

//A proxy to bypass cors
//const CORS_URL = 'http://cors-anywhere.herokuapp.com/'

//The URLs at which the API can be fetched
/**const API_URL = process.env.NODE_ENV === 'production' ? 
'http://location-wizard.herokuapp.com' : 'http://localhost:5000'
*/
const API_URL = 'http://location-wizard.herokuapp.com'

//TODO: Use Facebook? API to get less known events so that there is more variety
//Maybe can be done when user logs in through facebook
export async function getEventInformation(type)
{
    var targetURL = ''
    if(type === 'all')
    {
        targetURL = API_URL + '/events'
    }
    else
    {
        targetURL = API_URL + '/events/' + type
    }
    var fetchRes = await fetch(targetURL)
    console.log(fetchRes)
    var eventJSON = await fetchRes.json()
    console.log(eventJSON)
    //console.log(eventJSON)
    return eventJSON
    //res.json()).then(data => {return Promise.resolve(data)}))
}

export async function getBarInformation(type)
{
    var targetURL = ''
    if(type === 'all')
    {
        targetURL = API_URL + '/bars'
    }
    else
    {
        targetURL = API_URL + '/bars/' + type
    }
    var fetchRes = await fetch(targetURL)
    console.log(fetchRes)
    var barsJSON = await fetchRes.json()
    console.log(barsJSON)
    //console.log(eventJSON)
    return barsJSON
    //res.json()).then(data => {return Promise.resolve(data)}))
}

export async function getClubInformation(type)
{
    var targetURL = ''
    if(type === 'all')
    {
        //TODO: Organize clubs by the most popular (no default 'clubs' category on Yelp)
        targetURL = API_URL + '/clubs/danceclubs'
    }
    else
    {
        targetURL = API_URL + '/clubs/' + type
    }
    var fetchRes = await fetch(targetURL)
    console.log(fetchRes)
    var clubsJSON = await fetchRes.json()
    console.log(clubsJSON)
    //console.log(eventJSON)
    return clubsJSON
    //res.json()).then(data => {return Promise.resolve(data)}))
}

