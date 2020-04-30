import React, { Component, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Modal, Col, Button, Table, Tabs, Tab } from "react-bootstrap";

const SERVER_URL_packages = "http://localhost:3000/packages";

class PackageOperations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formdata: [],
    };

    this.onSave = this.onSave.bind(this);

    const fetchResults = () => {
      axios.get(SERVER_URL_packages).then((results) => {
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
    axios.get(SERVER_URL_packages).then((response) => {
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

    axios.delete(`${SERVER_URL_packages}/${id}`).then((result) => {});
  }

  editRecord(i) {
    let request = this.state.formdata[i];
    this.refs.editForm.setState({
      id: request._id,
      packageName: request.packageName,
      description: request.description,
      longdescrip: request.longdescrip,
      duration: request.duration,
      price: request.price,
      fromDate: request.fromDate,
      endDate: request.endDate,
    });
  }

  render() {
    let from = "",
      to = "",
      timeFrom = "",
      timeTo = "";
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Package</th>
              <th>Description</th>
              <th>Long Description</th>
              <th>Duration</th>
              <th>Price</th>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {this.state.formdata.map((item, i) => (
              // from = item.fromDate.toLocaleDateString(),
              // timeFrom = item.fromDate.toLocaleTimeString(),
              // to = item.fromDate.toLocaleDateString(),
              // timeTo = item.fromDate.toLocaleTimeString(),
              <tr key={i}>
                <td>{item._id}</td>
                <td>{item.packageName}</td>
                <td>{item.description}</td>
                <td>{item.longdescrip}</td>
                <td>{item.duration}</td>
                <td>{item.price}</td>
                <td>{item.fromDate}</td>
                <td>{item.toDate}</td>
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

export default PackageOperations;
