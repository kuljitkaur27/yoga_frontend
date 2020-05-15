import React, { Component } from "react";
import { Card, Button, CardColumns } from 'react-bootstrap';
import axios from 'axios';

const SERVER_URL_instructors = 'https://yogawebsite.herokuapp.com/instructors';

export default class Instructors extends Component {
  constructor() {
    super();
    this.state = {
      resultData: [],
      arr : ['../images/girl1.jpg','../images/girl2.png','../images/girl3.png','../images/girl4.jpeg','../images/girl5.jpeg']
    };

    const fetchResults = () => {
      axios.get(SERVER_URL_instructors).then((results) => {
        this.setState({ resultData: results.data });
      });
    };

  fetchResults();
  }


  render() {
    return (
      <div>
        <CardColumns>
        {this.state.resultData.map((item) => (
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={this.state.arr[Math.floor(Math.random()* this.state.arr.length)]} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{item.specialist}</Card.Subtitle>
              <Card.Text>
                {item.experience}
              </Card.Text>
              <Card.Link href={item.linkedIn}>LinkedIn</Card.Link>
              <Card.Link href={item.instagram}>Intagram</Card.Link>
              <Card.Link href={item.facebook}>Facebook</Card.Link>
            </Card.Body>
          </Card>
        ))}
        </CardColumns>
      </div>
    );
  }
}
