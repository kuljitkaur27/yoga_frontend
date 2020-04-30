import React, { Component, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Modal, Col, Button, Table, Tabs, Tab } from "react-bootstrap";

const SERVER_URL_yogas = "http://localhost:3000/yogas";

class YogaOperations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formdata: [],
    };

    this.onSave = this.onSave.bind(this);

    const fetchResults = () => {
      axios.get(SERVER_URL_yogas).then((results) => {
        this.setState({ formdata: results.data });
      });
    };

    fetchResults();
    this.deleteRecord = this.deleteRecord.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data, e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSave() {
    axios.get(SERVER_URL_yogas).then((response) => {
      this.setState({ formdata: response.data });
    });
    //.catch(err => { console.log('Something bad is happened:', err) });
  }

  deleteRecord(i) {
    let data = this.state.formdata[i];
    var id = data._id;

    alert("are you sure you want to Delete this item ?");
    this.setState({
      formdata: this.state.formdata.filter((item, index) => {
        return index !== i;
      }),
    });

    axios.delete(`${SERVER_URL_yogas}/${id}`).then((result) => {});
  }

  editRecord(i) {
    let request = this.state.formdata[i];
    this.refs.editForm.setState({
      id: request._id,
      yoga: request.yoga,
      description: request.description,
    });
  }

  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Yoga</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.state.formdata.map((item, i) => (
              <tr key={i}>
                <td>{item._id}</td>
                <td>{item.yoga}</td>
                <td>{item.description}</td>
                <td>
                  <Button variant="info" onClick={() => this.editRecord(i)}>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => this.deleteRecord(i)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default YogaOperations;
