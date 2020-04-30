import React, { Component, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Modal, Col, Button, Table, Tabs, Tab } from "react-bootstrap";
import moment from 'moment';

const SERVER_URL_classes = "http://localhost:3000/classes";

//Classes or timetable
class ClassOperations extends Component {
  constructor(props) {
    super(props);
    // this.state = { apiRes1: "" };

    this.state = {
      formdata: [],
    };

    this.onSave = this.onSave.bind(this);

    const fetchResults = () => {
      axios.get(SERVER_URL_classes).then((results) => {
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
    axios.get(SERVER_URL_classes).then((response) => {
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

    axios.delete(`${SERVER_URL_classes}/${id}`).then((result) => {});
  }

  editRecord(i) {
    let request = this.state.formdata[i];
    this.refs.editForm.setState({
      id: request._id,
      fromDate: request.fromDate,
      toDate: request.toDate,
      instructorId: request.instructorId,
      instructorName: request.instructorName,
      yogaId: request.yogaId,
      yoga: request.yoga,
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
              <th>From</th>
              <th>To</th>
              <th>Time From</th>
              <th>Time To</th>
              <th>Instructor</th>
              <th>Yoga</th>
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
                <td>{moment(item.fromDate).format('MMM-DD-YYYY')}</td>
                <td>{moment(item.to).format('MMM-DD-YYYY')}</td>
                <td>{moment(item.fromDate).format('hh:mm:ss')}</td>
                <td>{moment(item.to).format('hh:mm:ss')}</td>
                <td>{item.instructorName}</td>
                <td>{item.yoga}</td>
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

export default ClassOperations;
