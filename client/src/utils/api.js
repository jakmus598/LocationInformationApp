import React, {Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
var fetch = require('node-fetch')

//The URLs at which the API can be fetched
/**const API_URL = process.env.NODE_ENV === 'production' ? 
'http://location-wizard.herokuapp.com' : 'http://localhost:5000'
*/
const API_URL = 'http://location-wizard.herokuapp.com'

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
    var eventJSON = await fetchRes.json()
    //console.log(eventJSON)
    return eventJSON
    //res.json()).then(data => {return Promise.resolve(data)}))
}

