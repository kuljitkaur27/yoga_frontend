import React, { Component } from "react";
import { Form, Button, Col, Row, Figure } from "react-bootstrap";

export default class Contact extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      message: "",
    };

    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }
  onHandleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onHandleSubmit(e) {
    e.preventDefault();
    this.setState = {
      name: "",
      email: "",
      message: "",
    };
  }
  render() {
    return (
      <div>
        <h5 className="m-3 d-flex justify-content-left">
          Opening Hours: 6:00 - 21:00 (Mon-Sun)
        </h5>
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
        <Form
          action="mailto:kuljitkauremail@gmail.com"
          method="post" enctype="text/plain" >
          <Form.Group as={Row} controlId="name">
            <Form.Label column sm={1}>
              Name
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="text"
                name="name"
                value={this.state.name}
                placeholder="name"
                onChange={this.onHandleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="email">
            <Form.Label column sm={1}>
              Email
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="email"
                name="email"
                value={this.state.email}
                placeholder="name@example.com"
                onChange={this.onHandleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="message">
            <Form.Label column sm={1}>
              Your Message
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                as="textarea"
                name="message"
                value={this.state.message}
                rows="4"
                onChange={this.onHandleChange}
              />
            </Col>
          </Form.Group>
          <Button
            variant="success"
            className="m-3 d-flex justify-content-left"
            type="submit"
            onClick={this.onHandleSubmit}
          >
            Send
          </Button>
        </Form>

        <div></div>
      </div>
    );
  }
}
