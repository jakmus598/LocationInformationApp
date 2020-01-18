import '../CSS/TextBox.css'
import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import Box from '@material-ui/core/Box'
import TextButton from './TextButton'
import {Card, CardTitle, CardBody, ListGroup, Container, Row} from 'reactstrap'
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
            <div className="box">
                {this.props.filterList}
                <Container>{this.props.title}
                {this.props.children}
                </Container>
                {
                   this.state['mode'] && this.getButton()
                    
                }
            </div>
        
                
        )
               
        
    }

    /**
     * Returns a 'see more' button or returns nothing depending on state['mode']
     */

     getButton()
     {
        if(this.state['mode']==='preview')
        {
            var link = 'http://localhost:3000/' + this.props.boxType
            return(<a href={link} className="see-more">see more</a>)
        }
     }
}


/**
 * <Card className={this.props.cardClass} style={{width: '75rem'}}>
            <CardTitle className="title">{this.props.title}</CardTitle>
            <CardBody>
                {this.props.children}
            </CardBody>
        </Card>
 */
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