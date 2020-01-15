import React, {Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
var fetch = require('node-fetch')

//The URLs at which the API can be fetched
const API_URL = process.env.NODE_ENV === 'production' ? 
'http://location-wizard.herokuapp.com/events' : 'http://localhost:5000'

export async function getEventInformation()
{
    var fetchRes = await fetch(API_URL + '/events')
    var eventJSON = await fetchRes.json()
    return eventJSON
    //res.json()).then(data => {return Promise.resolve(data)}))
}
