import '../CSS/EventsBox.css'
import OtherInfo from './OtherInfo'
import {Card, CardTitle, ListGroup} from 'reactstrap'
import React, {Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import TextBox from './TextBox'
import TextButton from './TextButton'
import {getEventInformation} from '../utils/api'
var fetch = require('node-fetch')



class EventsBox extends TextBox
{
    constructor(props)
    {
        super(props)
        this.state = {}
    }

    async getEvents()
    {
        var events = await getEventInformation()
        this.setState({'events': events})
    }

    render()
    {
        //console.log(getEventInformation())
        this.getEvents()
        //console.log(this.state['events'])

        return (<TextBox className="box" style={{width: '25rem'}} title="Upcoming Events"> 
            {   
                this.state['events'] && this.getEventsArray()
            }
            
            </TextBox>
                )
                
        
            
            
                
                /**this.state['events'].map((eventName, eventURL) => {return(
                    <TextButton name={eventName} url={eventURL}></TextButton>
                )})
                */
        }

        getEventsArray()
        {
                var textButtons = []
                for(var i in this.state['events'])
                {
                    //Use a variable for the current event in the array
                    var currentValue = this.state['events'][i]
                    console.log(currentValue['date'])
                    console.log(currentValue['time'])

                    //Create a new TextButton with the name, and url of the event
                    //Use an OtherInfo component to store data relating to date and time of event
                    textButtons.push(<TextButton className="event-button" name={currentValue['name']} url={currentValue['url']}
                    otherInfo={<OtherInfo info={[currentValue['date'], currentValue['time']]}
                    className="date-and-time" />}></TextButton>)
                }
                return textButtons
            
        }
            
        

        /**
         *  return (<TextBox className="box">
            {   
                this.state['events'] && ( () => {
                var textButtons = []
                textButtons.push(<h1 className="header">Trending Events Near You</h1>)
                for(var i in this.state['events'])
                {
                    //Use a variable for the current value in the array
                    var currentValue = this.state['events'][i]
                    textButtons.push(<TextButton className="button" name={currentValue['name']} url={currentValue['url']}></TextButton>)
                    textButtons.push(<br></br>)
                }
                return textButtons
            }
                )
         */
             
                /**for(var i in this.state['events'])
                {
                    //Use a variable for the current value in the array
                    var currentValue = this.state['events'][i]
                    <TextButton name={currentValue['name']} url={currentValue['url']}></TextButton>
                }
                */
    }




export default EventsBox


//return(<TextButton name={events[i]['name']} url={events[i]['url']}></TextButton>)
/**  {() =>  {          
            for(var i in events)
            {
               return(<TextButton name={i['name']} url={i['url']}></TextButton>)
            }
        } } 
        */

        //<TextButton name={events[0]['name']} url={events[0]['url']}></TextButton>