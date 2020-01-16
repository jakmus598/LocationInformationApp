import '../CSS/TextBox.css'
import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import Box from '@material-ui/core/Box'
import TextButton from './TextButton'
import {Card, CardTitle, ListGroup, Container} from 'reactstrap'
import {borders} from '@material-ui/system'

class TextBox extends Component
{
    constructor(props)
    {
        super(props)
        //State used to determine whether all elements are showing or just a select few
        this.state = this.props.state
    }

    render()
    {
        return(
            <Box className={this.props.boxClassName}>
        <Container className={this.props.containerClass}>{this.props.title}
                {this.props.children}
                </Container>
                </Box>
        )
               
        
    }
}

/**
 * <Card style={this.props.style}>
                <CardTitle className="title-name">{this.props.title}</CardTitle>
                {this.props.children}
            </Card>
 */
/**
 * <Box>
            {this.props.children}
            </Box> 
 */
export default TextBox