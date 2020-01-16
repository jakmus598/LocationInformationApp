import '../CSS/OtherInfo.css'
import React, {Component} from 'react'
import {Row, Col} from 'reactstrap'

class OtherInfo extends Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return(this.getParagraphArray())
    }

    /**
     * Create an array of paragraph elements representing each addditional piece of information
     */
    getParagraphArray()
    {
        var paragraphArray = []
        //paragraphArray.push(<Row>)
        for(var i in this.props.info)
        {
            paragraphArray.push(<Col md="auto">{this.props.info[i]}</Col>)
            //paragraphArray.push(<br></br>)
        }
        //paragraphArray.push(</Row>)

        return paragraphArray
    }
    
}

export default OtherInfo
