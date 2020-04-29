import React, { Component } from "react";
import { Card, Button, CardColumns } from 'react-bootstrap';

export default class Instructors extends Component {
  render() {
    return (
      <div>
        <CardColumns>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/girl1.jpg"} />
          <Card.Body>
            <Card.Title>Christina</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Slow Flow Instructor</Card.Subtitle>
            <Card.Text>
              "Amazing instructor. Has varying levels of ability with grace. She is a wonderful teacher who is knowledgeable and experienced!"
            </Card.Text>
            <Card.Link href="#">Linked In Link</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/girl2.png"} />
          <Card.Body>
            <Card.Title>Sadhna</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Slow Flow Instructor</Card.Subtitle>
            <Card.Text>
              "Amazing instructor. Has varying levels of ability with grace. She is a wonderful teacher who is knowledgeable and experienced!"
            </Card.Text>
            <Card.Link href="#">Linked In Link</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/girl4.jpeg"} />
          <Card.Body>
            <Card.Title>Shriya</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Slow Flow Instructor</Card.Subtitle>
            <Card.Text>
              "Amazing instructor. Has varying levels of ability with grace. She is a wonderful teacher who is knowledgeable and experienced!"
            </Card.Text>
            <Card.Link href="#">Linked In Link</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/girl3.png"} />
          <Card.Body>
            <Card.Title>Jessica</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Slow Flow Instructor</Card.Subtitle>
            <Card.Text>
              "Amazing instructor. Has varying levels of ability with grace. She is a wonderful teacher who is knowledgeable and experienced!"
            </Card.Text>
            <Card.Link href="#">Linked In Link</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/girl5.jpeg"} />
          <Card.Body>
            <Card.Title>Jane</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Slow Flow Instructor</Card.Subtitle>
            <Card.Text>
              "Amazing instructor. Has varying levels of ability with grace. She is a wonderful teacher who is knowledgeable and experienced!"
            </Card.Text>
            <Card.Link href="#">Linked In Link</Card.Link>
          </Card.Body>
        </Card>
        </CardColumns>
      </div>
    );
  }
}
