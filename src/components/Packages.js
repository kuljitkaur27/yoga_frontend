import React, { Component } from "react";
import { Card, Button, CardColumns } from 'react-bootstrap';
import axios from 'axios';

const SERVER_URL_packages = 'https://yogawebsite.herokuapp.com/packages';
export default class Packages extends Component {
  constructor() {
    super();
    this.state = {
      resultData: [],
      arr : ['light','success','warning','info']
    };

    const fetchResults = () => {
      axios.get(SERVER_URL_packages).then((results) => {
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
            <Card style={{ width: '18rem' }} bg={this.state.arr[Math.floor(Math.random()* this.state.arr.length)]}>
              <Card.Body>
                <Card.Title>{item.packageName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item.description}</Card.Subtitle>
                <Card.Text>
                  {item.longdescrip}
                </Card.Text>
                <Card.Link href="#">Payment</Card.Link>
              </Card.Body>
            </Card>
          ))}
        </CardColumns>
      </div>
    );
  }
}
