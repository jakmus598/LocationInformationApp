import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {ListGroup, ListGroupItem, Card, CardTitle} from 'reactstrap';

class App extends Component
{
  render()
  {
    return(
      <Card style={{width: '18rem'}}>
        <CardTitle className="TitleClass">Hello there</CardTitle>
      <ListGroup>
        <ListGroupItem tag="a" href="https://www.google.com" action>Hello</ListGroupItem>
        <ListGroupItem tag="a" href="https://www.google.com" action>Hellos</ListGroupItem>        
        <ListGroupItem tag="a" href="https://www.google.com" action>Hellosdfs</ListGroupItem>  
      </ListGroup>
      </Card>

    )
  }
}

export default App;
