import React, { Component, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Modal, Col, Button, Table, Tabs, Tab } from "react-bootstrap";

const SERVER_URL_members = "http://localhost:3000/members";

//Members
class MemberOperations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formdata: [],
    };

    this.onSave = this.onSave.bind(this);

    const fetchResults = () => {
      axios.get(SERVER_URL_members).then((results) => {
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
    axios.get(SERVER_URL_members).then((response) => {
      this.setState({ formdata: response.data });
    });
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

    axios.delete(`${SERVER_URL_members}/${id}`).then((result) => {});
  }

  editRecord(i) {
    let request = this.state.formdata[i];
    this.refs.editForm.setState({
      id: request._id,
      name: request.name,
      emailId: request.emailId,
      address: request.address,
      phone: request.phone,
      startDate: request.startDate,
      endDate: request.endDate,
      packageName: request.packageName,
      payment: request.payment,
      counter: request.counter,
    });
  }

  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Package</th>
              <th>Payment</th>
              <th>Counter</th>
            </tr>
          </thead>
          <tbody>
            {this.state.formdata.map((item, i) => (
              <tr key={i}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.emailId}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.packageName}</td>
                <td>{item.payment}</td>
                <td>{item.counter}</td>
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

export default MemberOperations;
