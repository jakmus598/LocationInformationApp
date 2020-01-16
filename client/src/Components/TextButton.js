import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {ListGroup, ListGroupItem} from 'reactstrap'
import {Container, Row, Col} from 'reactstrap'
import '../CSS/TextButton.css'


class TextButton extends Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return(
            <Row className="row">
                <Col className="name" md="auto">{this.props.name}</Col>
                <Row>
                <div className="other-info">{this.props.otherInfo}</div>
                </Row>
            </Row>
        )
    }

    /**
     * 
     */

    /**
     *  <ListGroup horizontal className="row">
            <ListGroupItem className="name" tag="p">
                <Col>{this.props.name}</Col>
                <Col>Hello</Col></ListGroupItem>
            <ListGroupItem className="other-info">{this.props.otherInfo}</ListGroupItem>
            </ListGroup>
     */
}

/**
 * <ListGroupItem className="text-button" tag="a" href={this.props.url}>{this.props.name}
            {this.props.otherInfo}</ListGroupItem>
 */

/**
 * return(
            <a href= {this.props.url}>{this.props.name}</a>
        )
 */

export default TextButton