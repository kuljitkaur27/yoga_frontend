import React, { Component } from "react";
import { Form, Button, Col, Row, Figure } from 'react-bootstrap';

export default class Contact extends Component {
  render(){
    return(
      <div>
      <h5 className="m-3 d-flex justify-content-left">Opening Hours: 6:00 - 21:00 (Mon-Sun)</h5>
        <Figure className="m-3 d-flex justify-content-left">
          <Figure.Image
            width={100}
            height={100}
            align="right"
            alt="171x180"
            src={process.env.PUBLIC_URL + "/images/phone.jpeg"}
          />
          <Figure.Caption className="m-3 d-flex justify-content-left">
            <strong>0412345678</strong>
          </Figure.Caption>
        </Figure>
        <Form>
          <Form.Group as={Row} controlId="name">
            <Form.Label column sm={1}>Name</Form.Label>
            <Col sm={4}>
            <Form.Control type="text" placeholder="name" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="email">
            <Form.Label column sm={1}>Email</Form.Label>
            <Col sm={4}>
            <Form.Control type="email" placeholder="name@example.com" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="message">
            <Form.Label column sm={1}>Your Message</Form.Label>
            <Col sm={4}>
            <Form.Control as="textarea" rows="4" />
            </Col>
          </Form.Group>
          <Button variant="success" className="m-3 d-flex justify-content-left" type="submit">
            Send
          </Button>
        </Form>

        <div>

        </div>
      </div>
    );
  }
}
