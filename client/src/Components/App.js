import '../CSS/App.css'
import React, {Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import TextBox from './TextBox'
import TextButton from './TextButton'
import InformationBox from './InformationBox'
import EventsBox from './EventsBox'
import BarsBox from './BarsBox'
import ClubsBox from './ClubsBox'
import {getEventInformation, getBarInformation, getClubInformation} from '../utils/api'

class App extends Component
{
    constructor(props)
    {
        super(props)
    }

    //TODO: Create one component called PlacesBox and pass them each parameters
    //to use below

    render()
    {
        return(
            <div>
                <h2 className="site-title">Location Wizard</h2>
                <InformationBox getInfo={getEventInformation} otherInfo={['date', 'time']} filterChoices=
                {['all', 'music', 'sports', 'arts', 'family', 'film']} filterNames={['All', 'Music', 
                'Sports', 'Arts', 'Family', 'Film']} title='Events'  state={{'mode': 'preview', 'filterValue': 'all'}} />

                <InformationBox getInfo={getBarInformation} otherInfo={['address', 'cityState']} filterChoices=
                {['all', 'pubs', 'sportsbars', 'winebars']} filterNames={['All', 'Pubs', 
                'Sports bars', 'Wine bars']} title='Bars'  state={{'mode': 'preview', 'filterValue': 'all'}} />

                <InformationBox getInfo={getClubInformation} otherInfo={['address', 'cityState']} filterChoices=
                {['all', 'socialclubs', 'comedyclubs', 'danceclubs']} filterNames={['All', 'Social', 
                'Comedy', 'Dance']} title='Clubs'  state={{'mode': 'preview', 'filterValue': 'all'}} />
        </div>
        )
    }
}

//<ClubsBox state={{'mode': 'preview', 'filterValue': 'all'}} title="Clubs"></ClubsBox>

//<EventsBox state={{'mode': 'preview', 'filterValue': 'all'}} title="Events"></EventsBox>

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