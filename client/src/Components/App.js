import '../CSS/App.css'
import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
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

    //Set variables for each of the Information boxes to allow for easier routing
    eventsBox = (mode) => (<InformationBox getInfo={getEventInformation} otherInfo={['date', 'time']} filterChoices=
    {['all', 'music', 'sports', 'arts', 'family', 'film']} filterNames={['All', 'Music', 
    'Sports', 'Arts', 'Family', 'Film']} title='Events' boxType="events"
    state={{'mode': mode, 'filterValue': 'all'}} />)
    
    barsBox = (mode) => (<InformationBox getInfo={getBarInformation} otherInfo={['address', 'cityState']} filterChoices=
    {['all', 'pubs', 'sportsbars', 'winebars']} filterNames={['All', 'Pubs', 
    'Sports bars', 'Wine bars']} title='Bars' boxType="bars" state={{'mode': mode, 'filterValue': 'all'}} />)

    clubsBox = (mode) => (<InformationBox getInfo={getClubInformation} otherInfo={['address', 'cityState']} filterChoices=
    {['all', 'socialclubs', 'comedyclubs', 'danceclubs']} filterNames={['All', 'Social', 
    'Comedy', 'Dance']} title='Clubs' boxType='clubs' state={{'mode': mode, 'filterValue': 'all'}} />)

    //FullEventsBox = this.eventsBox('full')
    //TestComponent = () => <p>Hello there</p>

    /**
     * <InformationBox getInfo={getEventInformation} otherInfo={['date', 'time']} filterChoices=
                {['all', 'music', 'sports', 'arts', 'family', 'film']} filterNames={['All', 'Music', 
                'Sports', 'Arts', 'Family', 'Film']} title='Events' boxType="events"
                 state={{'mode': 'preview', 'filterValue': 'all'}} />
     */

     /**
      * <Router>
                 <Route path="/events" exact render={() => {
                     return (<div>{this.eventsBox('preview')}</div>)
                 }} />
                 </Router>
      */
    render()
    {
        return(
            <div>
                <h2 className="site-title">Nightlife Network</h2>
                <Router>
                    <Switch>
                        <Route path='/' exact render={() => { return (
                        <div>
                            {this.eventsBox('preview')}
                            {this.barsBox('preview')}
                            {this.clubsBox('preview')}
                        </div>
                        )}} />
                        <Route path='/events' exact render={() => this.eventsBox('full')} />
                     </Switch>
                </Router>
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