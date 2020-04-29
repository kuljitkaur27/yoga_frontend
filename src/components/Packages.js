import React, { Component } from "react";
import { Card, Button, CardColumns } from 'react-bootstrap';

export default class Packages extends Component {
  render(){
    return(
      <div>
        <CardColumns>
        <Card style={{ width: '18rem' }} bg="light">
          <Card.Body>
            <Card.Title>Membership</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Minimum period: 6 months @ $23/week</Card.Subtitle>
            <Card.Text>
              You can come for all classes, any time from Monday to Saturday. Unlimited access to Classes, great bonding with peers and instructors. Always allocated space for Members.
            </Card.Text>
            <Card.Link href="#">Payment</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} bg="success">
          <Card.Body>
            <Card.Title>10 Passes</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Consume in 1 year @ $150</Card.Subtitle>
            <Card.Text>
              You can come for all classes, any time from Monday to Saturday. Unlimited access to Classes, great bonding with peers and instructors. Always allocated space for Members.
            </Card.Text>
            <Card.Link href="#">Payment</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} bg="warning">
          <Card.Body>
            <Card.Title>50 Passes</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Consume in 1 year @ $700</Card.Subtitle>
            <Card.Text>
              You can come for all classes, any time from Monday to Saturday. Unlimited access to Classes, great bonding with peers and instructors. Always allocated space for Members.
            </Card.Text>
            <Card.Link href="#">Payment</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} bg="info">
          <Card.Body>
            <Card.Title>100 Passes</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Consume in 1 year @ $1300</Card.Subtitle>
            <Card.Text>
              You can come for all classes, any time from Monday to Saturday. Unlimited access to Classes, great bonding with peers and instructors. Always allocated space for Members.
            </Card.Text>
            <Card.Link href="#">Payment</Card.Link>
          </Card.Body>
        </Card>
        </CardColumns>
      </div>
    );
  }
}
