import React, { Component } from "react";
import { Card, Button, CardColumns } from 'react-bootstrap';
import axios from 'axios';

const SERVER_URL_yogas = 'https://yogawebsite.herokuapp.com/yogas';
export default class Yogas extends Component {
  constructor() {
    super();
    this.state = {
      resultData: [],
      arr : ['light','success','warning','info']
    };

    const fetchResults = () => {
      axios.get(SERVER_URL_yogas).then((results) => {
        this.setState({ resultData: results.data });
      });
    };

  fetchResults();
  }


  render(){
    return(
      <div>
        <CardColumns>
          {this.state.resultData.map((item) => (
            <Card style={{ width: '28rem' }} bg={this.state.arr[Math.floor(Math.random()* this.state.arr.length)]}>
              <Card.Body>
                <Card.Title>{item.yoga}</Card.Title>
                <Card.Text>
                  {item.description}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </CardColumns>
      </div>
    );
  }
}
