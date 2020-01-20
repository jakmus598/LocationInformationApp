import '../CSS/App.css'
import React, {Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import TextBox from './TextBox'
import TextButton from './TextButton'
import EventsBox from './EventsBox'
import BarsBox from './BarsBox'
import {getEventInformation} from '../utils/api'

class App extends Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return(
            <div>
                <h2 className="site-title">Location Wizard</h2>
               <EventsBox state={{'mode': 'preview', 'filterValue': 'all'}} title="Events"></EventsBox>
               <BarsBox state={{'mode': 'preview', 'filterValue': 'all'}} title="Bars"></BarsBox>
        </div>
        )
    }
}

//<Route path = "/events" render={() => <TextBox textButtons={<TextButton url={"https://www.google.com/"} name="Hello"></TextButton>}></TextBox>}>
//</Route>
/**
 * <TextBox>
                    <TextButton url={'/events'} name={'See more events'}/>
                </TextBox>
 */


 /**
  *  <TextBox>
            {() =>  {          
            for(var i in getEventInformation)
            {
               return(<TextButton name={i['name']} url={i['url']}></TextButton>)
            }
        } }       
            </TextBox>
  */
export default App