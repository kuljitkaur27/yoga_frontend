import React, { Component, useState } from "react";
import axios from "axios";
import { Modal, Col, Button, Table, Tabs, Tab } from "react-bootstrap";
import moment from 'moment';

const SERVER_URL_classes = "https://yogawebsite.herokuapp.com/classes";
//"http://localhost:3000/classes";

//Classes or timetable
class Classes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: []
    };

    const fetchResults = () => {
      axios.get(SERVER_URL_classes).then((results) => {
        this.setState({ formdata: results.data });
      });
    };

    fetchResults();
  }


  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
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
              <tr key={i}>
                <td>{moment(item.fromDate).format('MMM-DD-YYYY')}</td>
                <td>{moment(item.toDate).format('MMM-DD-YYYY')}</td>
                <td>{moment(item.fromTime).format('hh:mm:ss')}</td>
                <td>{moment(item.toTime).format('hh:mm:ss')}</td>
                <td>{item.instructorName}</td>
                <td>{item.yoga}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Classes;
