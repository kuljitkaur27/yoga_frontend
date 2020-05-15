import React, { Component, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Modal, Col, Button, Table, Tabs, Tab } from "react-bootstrap";
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';

const SERVER_URL_classes = "https://yogawebsite.herokuapp.com/classes";

//Classes or timetable
class ClassOperations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: [],
      isOpen: false,
      editFormData: {},
      title : ''
    };

    const fetchResults = () => {
      axios.get(SERVER_URL_classes).then((results) => {
        this.setState({ formdata: results.data });
      });
    };

    fetchResults();
    this.onSave = this.onSave.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.onSave = this.onSave.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onShowModal = this.onShowModal.bind(this);
  }

  showModal(request, i) {
    this.setState({
      isOpen: true,
      editFormData: request,
      title: 'Edit Record'
    });
  }

  showAddModal() {
    this.setState({
      isOpen: true,
      editFormData: {
        id: '',
        fromDate: '',
        toDate: '',
        fromTime: '',
        toTime: '',
        instructorId: '',
        instructorName: '',
        yogaId: '',
        yoga: '',
      }
    });
    this.setState({title: 'Add Record'});
  }

  onShowModal() {
    if(this.state.title == 'Edit Record') {
      let request = this.state.editFormData;
      this.refs.editForm.setState({
        _id: request._id,
        fromDate: request.fromDate,
        toDate: request.toDate,
        fromTime: request.fromTime,
        toTime: request.toTime,
        instructorId: request.instructorId,
        instructorName: request.instructorName,
        yogaId: request.yogaId,
        yoga: request.yoga
      });
    }
  }

  hideModal() {
    this.setState({ isOpen: false });
  }

  onSubmit(event) {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log(event.target.email.value);
  }

  handleChange(data, e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSave() {
    axios.get(SERVER_URL_classes).then((response) => {
      this.setState({ formdata: response.data });
    });
  }

  deleteRecord(i) {
      let data = this.state.formdata[i];
      var id = data._id;

  if(window.confirm("are you sure you want to Delete this item ?")){

    axios.delete(`${SERVER_URL_classes}/${id}`).then((result) => {
      this.setState({
        formdata: this.state.formdata.filter((item, index) => {
          return index !== i;
        }),
      });
    });
  }
  }

  render() {
    return (
      <div>
      <div className="m-2">
        <Button variant="info" onClick={() => this.showAddModal()}>
          Add
        </Button>{' '}
      </div>
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
                <td>
                <Button
                  variant="info"
                  onClick={() => this.showModal(item, i)}
                >
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
        <Modal
          ref="editModal"
          show={this.state.isOpen}
          onShow={() => this.onShowModal()}
          onHide={this.hideModal}
        >
          <Modal.Header>
            <Modal.Title>{this.state.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Edit status='edit' ref="editForm" save={this.onSave}/>
            <br />
            <button onClick={this.hideModal}>Cancel</button>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      fromDate: '',
      toDate: '',
      fromTime: '',
      toTime: '',
      instructorId: '',
      instructorName: '',
      yogaId: '',
      yoga: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {

  //Edit
      let id = this.state._id;
      if(!!(id)){
      axios.put(`${SERVER_URL_classes}/${id}`, this.state).then((result) => {
        this.props.save();
        this.setState({
          _id: '',
          fromDate: '',
          toDate: '',
          fromTime: '',
          toTime: '',
          instructorId: '',
          instructorName: '',
          yogaId: '',
          yoga: ''
        });
      });
    } else {
      axios.post(`${SERVER_URL_classes}`, this.state).then((result) => {
        this.props.save();
        this.setState({
          _id: "",
          fromDate: '',
          toDate: '',
          fromTime: '',
          toTime: '',
          instructorId: '',
          instructorName: '',
          yogaId: '',
          yoga: ''
        });
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="hidden" name="_id" value={this.state._id} />
        <label>
          From :
          <br />
          <input
            type="date"
            name="fromDate"
            required
            value={moment(this.state.fromDate).format('MMM-DD-YYYY')}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          To :
          <br />
          <input
            type="date"
            name="toDate"
            required
            value={moment(this.state.toDate).format('MMM-DD-YYYY')}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Time From :
          <br />
          <input type="time" min="06:00" max="21:00"
            name="fromTime"
            required
            value={moment(this.state.fromTime).format('hh:mm:ss')}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Time To :
          <br />
          <input
            type="time" min="06:00" max="21:00"
            name="toTime"
            required
            value={moment(this.state.toTime).format('hh:mm:ss')}
            onChange={this.handleChange}
          />
        </label>
        <input
          type="hidden"
          name="instructorId"
          value={this.state.instructorId}
          onChange={this.handleChange}
        />
        <br />
        <label>
          Instructor:
          <br />
          <input
            type="String"
            name="instructorName"
            value={this.state.instructorName}
            onChange={this.handleChange}
          />
        </label>
        <input
          type="hidden"
          name="yogaId"
          value={this.state.yogaId}
          onChange={this.handleChange}
        />
        <br />
        <label>
          Yoga:
          <br />
          <input
            type="String"
            name="yoga"
            value={this.state.yoga}
            onChange={this.handleChange}
          />
        </label>
        <br /><br />
        <button type="submit">Save</button>
      </form>
    );
  }
}

export default ClassOperations;
