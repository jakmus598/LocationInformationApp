/**
 * This class represents a template that will be used to create the boxes that display events,
 * bars, clubs, etc.
 */

import '../CSS/InformationBox.css'
import OtherInfo from './OtherInfo'
//import {Card, CardTitle, ListGroup} from 'reactstrap'
import React, {Component} from 'react'
//import { BrowserRouter, Route } from 'react-router-dom'
import TextBox from './TextBox'
import TextButton from './TextButton'
//import {getEventInformation} from '../utils/api'
//var fetch = require('node-fetch')



class InformationBox extends TextBox
{
    constructor(props)
    {
        super(props)
        this.recordChange = this.recordChange.bind(this)
        //Call the getInfo method to set state['info'] to its initial state

        //if(this.state['mode'] === 'preview')
        //{
            this.getInfo(this.state['filterValue'])
        //}

    }

    getInfo = async(filterValue) =>
    {
        var info = await this.props.getInfo(filterValue)

        /**
         * If state = preview, only show first five elements. Otherwise, display all.
         */
        if(this.state['mode'] === 'preview' && info.length > 5)
        {
            var tempInfo = []
            for(var i=0; i < 5; i++)
            {
                tempInfo.push(info[i])
            }
            info = tempInfo
        }
        this.setState({'info': info})
    }
    


    render()
    {

        return (<TextBox className="text-box" title={this.props.title} state={{'mode': this.state['mode']}}
                filterList={this.getFilterList()} boxType={this.props.boxType}> 
                {   
                    this.state['info'] && this.getInfoArray()
                }
                </TextBox>
                
                
            )
        }

        /**
         * A function to create an array of TextButtons that will be displayed in each box
         */
        getInfoArray()
        {   
            var textButtons = []
            for(var i in this.state['info'])
            {
                //Use a variable for the current event/club/bar (info) in the array
                var currentValue = this.state['info'][i]

                //Create a new TextButton with the name, and url of the information
                //Use an OtherInfo component to store other data (date, time, address, etc)
                textButtons.push(<TextButton name={currentValue['name']} url={currentValue['url']}
                otherInfo={<OtherInfo info={this.displayOtherInfo(currentValue)}
                className={this.props.otherInfoClassname} />}></TextButton>)
            }
            return textButtons
            
        }

        /**
         * A function to correctly display otherInfo
         * @param infoObject - The current set of information that contains otherInfo
         */
        displayOtherInfo(infoObject)
        {
            var otherInfoArray = []
            for(var i in this.props.otherInfo)
            {
                otherInfoArray.push(infoObject[this.props.otherInfo[i]])
            }
            return otherInfoArray
        }

        /**
         * Creates the list of options for the filter button
         */
        getFilterList()
        {
            //Get all the potential options as specified by this.props.filterChoices
            //Use two arrays - one for the filter value names and one for the names that appear 
            //on the screen
            var filterValues = []
            for(var i in this.props.filterChoices)
            {
                filterValues.push(<option value={this.props.filterChoices[i]}>{this.props.filterNames[i]}</option>)
            }

            return(
                <select className="filter-button" value={this.state['filterValue']} onChange={this.recordChange}>
                    {filterValues}
                </select>
            )
        }

        /**
         * Resets filterValue when a new option is selected
         */
        recordChange(event)
        {
            
            this.setState({'filterValue': event.target.value})
        }

        componentDidUpdate(prevProps, prevState, snapshot)
        {
            console.log('componentDidUpdate state: ' + this.state['filterValue'])
            if(this.state['filterValue'] !== prevState['filterValue'])
            {
                this.getInfo(this.state['filterValue'])
            }
        }

    /**shouldComponentUpdate(nextProps, nextState)
    {
        if(nextState['filterValue'] !== this.state['filterValue'])
        {
            //nextProps.type = nextState['filterValue']
            //nextProps.title = nextProps.filterValue
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
        return false
        
    }
    */
    }




export default InformationBox

