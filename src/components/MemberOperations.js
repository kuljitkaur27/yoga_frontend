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
      isOpen: false,
      editFormData: {},
      title : ''
    };

    const fetchResults = () => {
      axios.get(SERVER_URL_members).then((results) => {
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
        name: '',
        emailId: '',
        address: '',
        phone: '',
        startDate: '',
        endDate: '',
        packageName: '',
        payment: '',
        counter: ''
      }
    });
    this.setState({title: 'Add Record'});
  }

  onShowModal() {
    if(this.state.title == 'Edit Record') {
      let request = this.state.editFormData;
      this.refs.editForm.setState({
        _id: request._id,
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
    axios.get(SERVER_URL_members).then((response) => {
      this.setState({ formdata: response.data });
    });
  }

  deleteRecord(i) {
    let data = this.state.formdata[i];
    var id = data._id;

    alert("are you sure you want to Delete this item ?");

    axios.delete(`${SERVER_URL_members}/${id}`).then((result) => {
      this.setState({
        formdata: this.state.formdata.filter((item, index) => {
          return index !== i;
        }),
      });
    });
  }

  render() {
    return (
      <div>
      <Button variant="info" onClick={() => this.showAddModal()}>
        Add
      </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
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
      name: '',
      emailId: '',
      address: '',
      phone: '',
      startDate: '',
      endDate: '',
      packageName: '',
      payment: '',
      counter: ''
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
      axios.put(`${SERVER_URL_members}/${id}`, this.state).then((result) => {
        this.props.save();
        this.setState({
          _id: '',
          name: '',
          emailId: '',
          address: '',
          phone: '',
          startDate: '',
          endDate: '',
          packageName: '',
          payment: '',
          counter: ''
        });
      });
    } else {
      axios.post(`${SERVER_URL_members}`, this.state).then((result) => {
        this.props.save();
        this.setState({
          _id: '',
          name: '',
          emailId: '',
          address: '',
          phone: '',
          startDate: '',
          endDate: '',
          packageName: '',
          payment: '',
          counter: ''
        });
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="hidden" name="_id" value={this.state._id} />
        <label>
          Name:
          <br />
          <input
            type="String"
            name="name"
            required
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <br />
          <input
            type="String"
            name="emailId"
            required
            value={this.state.emailId}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Address:
          <br />
          <input
            type="String"
            name="address"
            required
            value={this.state.address}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <br />
          <input
            type="String"
            name="phone"
            value={this.state.phone}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Start Date:
          <br />
          <input
            type="date"
            name="startDate"
            value={this.state.startDate}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          End Date:
          <br />
          <input
            type="date"
            name="endDate"
            value={this.state.endDate}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Package:
          <br />
          <input
            type="String"
            name="packageName"
            value={this.state.packageName}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Payment:
          <br />
          <input
            type="Number"
            name="payment"
            value={this.state.payment}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Counter:
          <br />
          <input
            type="Number"
            name="counter"
            value={this.state.counter}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <button type="submit">Save</button>
        <br />
      </form>
    );
  }
}

export default MemberOperations;
