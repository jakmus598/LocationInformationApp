import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {ListGroupItem} from 'reactstrap'

class TextButton extends Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return(
            <ListGroupItem className="text-button" tag="a" href={this.props.url}>{this.props.name}
            {this.props.otherInfo}</ListGroupItem>
        )
    }
}

/**
 * return(
            <a href= {this.props.url}>{this.props.name}</a>
        )
 */

export default TextButton