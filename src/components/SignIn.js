import React, { Component } from "react";
import { Form, Button, Col, Row, Figure } from 'react-bootstrap';

export default class SignIn extends Component {
  render(){
    return(
      <div>
        <h2 className="m-3 d-flex justify-content-left">Sign In.....</h2>
        <Form>
          <Form.Group as={Row} controlId="signEmail">
            <Form.Label column sm={1}>Email</Form.Label>
            <Col sm={4}>
            <Form.Control type="email" placeholder="Enter email" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="signPwd">
            <Form.Label column sm={1}>Password</Form.Label>
            <Col sm={4}>
            <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>

          <Button className="m-3 d-flex justify-content-left" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
