import '../CSS/BarsBox.css'
import OtherInfo from './OtherInfo'
import {Card, CardTitle, ListGroup} from 'reactstrap'
import React, {Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import TextBox from './TextBox'
import TextButton from './TextButton'
import {getBarInformation} from '../utils/api'
var fetch = require('node-fetch')


class BarsBox extends TextBox
{
    constructor(props)
    {
        super(props)
        //this.state['filterValue'] = 'all'
        this.recordChange = this.recordChange.bind(this)
        this.getClubs()

    }

    getBars = async(filterValue) =>
    {
        var bars = await getClubInformation(filterValue)
        //console.log('events: ' + events)
        //console.log(this.state['filterValue'])
        /**
         * If state = preview, only show first five elements. Otherwise, display all.
         */
        if(this.state['mode'] === 'preview' && bars.length > 5)
        {
            var tempBars = []
            for(var i=0; i < 5; i++)
            {
                tempBars.push(bars[i])
            }
            bars = tempBars
        }
        this.setState({'bars': bars})
    }
    

    //this.state['events'] && this.getEventsArray()

    shouldComponentUpdate(nextProps, nextState)
    {
        //console.log('Called')
        if(nextState['filterValue'] !== this.state['filterValue'])
        {
            //nextProps.type = nextState['filterValue']
            //nextProps.title = nextProps.filterValue
            //console.log('shouldComponentUpdate (current state): ' + this.state['filterValue'])
            //console.log('shouldComponentUpdate (next state): ' + nextState['filterValue'])
            //this.getEvents(nextState['filterValue'])
            return true
        }

        if(nextState['mode'] !== this.state['mode'])
        {
            return true
        }

        if(nextProps !== this.props)
        {
            return true
        }
        return true
        
    }


    render()
    {
        //console.log(getEventInformation())
        //this.getEvents()
        //console.log(this.state['events'])

        return (<TextBox className="text-box" title={this.props.title} state={{'mode': this.state['mode']}}
                filterList={this.getFilterList()}> 
            {   
                this.state['bars'] && this.getBarsArray()
            }
            
            </TextBox>
                )
     
        
            
            
                
                /**this.state['events'].map((eventName, eventURL) => {return(
                    <TextButton name={eventName} url={eventURL}></TextButton>
                )})
                */
        }

        getBarsArray()
        {   
                //console.log('Called')
                //console.log(this.state['events'])
                var textButtons = []
                for(var i in this.state['bars'])
                {
                    //TODO: Remove all events whose date is already passed

                    //Use a variable for the current event in the array
                    var currentValue = this.state['bars'][i]
                    //console.log(currentValue['date'])
                    //console.log(currentValue['time'])

                    //Create a new TextButton with the name, and url of the event
                    //Use an OtherInfo component to store data relating to date and time of event
                    textButtons.push(<TextButton name={currentValue['name']} url={currentValue['url']}
                    otherInfo={<OtherInfo info={[currentValue['address'], currentValue['cityState']]}
                    className="address" />}></TextButton>)
                }
                //console.log(textButtons)
                return textButtons
            
        }

        /**
         * Creates the list of options for the filter button
         */
        getFilterList()
        {
            return(
                <select className="filter-button" value={this.state['filterValue']} onChange={this.recordChange}>
                    filter
                    <option value="all">All</option>
                    <option value="pubs">Pubs</option>
                    <option value="sportsbars">Sports bars</option>
                    <option value="winebars">Wine bars</option>
                </select>
            )
        }

        /**
         * Resets filterValue when a new option is selected
         */
        recordChange(event)
        {
            console.log(event.target.value)
            this.setState({'filterValue': event.target.value})
           // console.log(this.state['filterValue'])
            //console.log(event.target.value)
            //this.getEvents()
        }

    /**shouldComponentUpdate(nextProps, nextState)
    {
        if(nextState['filterValue'] !== this.state['filterValue'])
        {
            //nextProps.type = nextState['filterValue']
            //nextProps.title = nextProps.filterValue
            console.log('shouldComponentUpdate (current state): ' + this.state['filterValue'])
            console.log('shouldComponentUpdate (next state): ' + nextState['filterValue'])
            this.getEvents(nextState['filterValue'])
            return true
        }

        if(nextState['mode'] !== this.state['mode'])
        {
            return true
        }

        if(nextProps !== this.props)
        {
            return true
        }
        return true
        
    }
    */

   componentDidUpdate(prevProps, prevState, snapshot)
   {
       console.log('componentDidUpdate state: ' + this.state['filterValue'])
       if(this.state['filterValue'] !== prevState['filterValue'])
       {
           this.getBars(this.state['filterValue'])
       }
   }



        /**
         * otherInfo={<OtherInfo info={'[currentValue[date]', 'currentValue[time]']}
                    className="date-and-time" />}
         */
            
        

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




export default BarsBox


//return(<TextButton name={events[i]['name']} url={events[i]['url']}></TextButton>)
/**  {() =>  {          
            for(var i in events)
            {
               return(<TextButton name={i['name']} url={i['url']}></TextButton>)
            }
        } } 
        */

        //<TextButton name={events[0]['name']} url={events[0]['url']}></TextButton>