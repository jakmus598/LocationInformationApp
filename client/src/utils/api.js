import React, {Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
var fetch = require('node-fetch')

var API_URL = 'http://localhost:5000'

export async function getEventInformation()
{
    var fetchRes = await fetch('http://localhost:5000/events')
    var eventJSON = await fetchRes.json()
    return eventJSON
    //res.json()).then(data => {return Promise.resolve(data)}))
}
