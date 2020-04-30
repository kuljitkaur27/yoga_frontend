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
      isOpen: false,
      editFormData: {},
      title : ''
    };

    const fetchResults = () => {
      axios.get(SERVER_URL_packages).then((results) => {
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
        packageName: '',
        description: '',
        longdescrip: '',
        duration: '',
        price: '',
        fromDate: '',
        endDate: ''
      }
    });
    this.setState({title: 'Add Record'});
  }

  onShowModal() {
    if(this.state.title == 'Edit Record') {
      let request = this.state.editFormData;
      this.refs.editForm.setState({
        _id: request._id,
        packageName: request.packageName,
        description: request.description,
        longdescrip: request.longdescrip,
        duration: request.duration,
        price: request.price,
        fromDate: request.fromDate,
        endDate: request.endDate
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
    axios.get(SERVER_URL_packages).then((response) => {
      this.setState({ formdata: response.data });
    });
    //.catch(err => { console.log('Something bad is happened:', err) });
  }

  deleteRecord(i) {
    let data = this.state.formdata[i];
    var id = data._id;

    alert("are you sure you want to Delete this item ?");

    axios.delete(`${SERVER_URL_packages}/${id}`).then((result) => {
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
              <th>Package</th>
              <th>Description</th>
              <th>Long Description</th>
              <th>Duration</th>
              <th>Price($)</th>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {this.state.formdata.map((item, i) => (
              <tr key={i}>
                <td>{item.packageName}</td>
                <td>{item.description}</td>
                <td>{item.longdescrip}</td>
                <td>{item.duration}</td>
                <td>{item.price}</td>
                <td>{item.fromDate}</td>
                <td>{item.toDate}</td>
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
      packageName: '',
      description: '',
      longdescrip: '',
      duration: '',
      price: '',
      fromDate: '',
      endDate: ''
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
      axios.put(`${SERVER_URL_packages}/${id}`, this.state).then((result) => {
        this.props.save();
        this.setState({
          _id: '',
          packageName: '',
          description: '',
          longdescrip: '',
          duration: '',
          price: '',
          fromDate: '',
          endDate: ''
        });
      });
    } else {
      axios.post(`${SERVER_URL_packages}`, this.state).then((result) => {
        this.props.save();
        this.setState({
          _id: '',
          packageName: '',
          description: '',
          longdescrip: '',
          duration: '',
          price: '',
          fromDate: '',
          endDate: ''
        });
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="hidden" name="_id" value={this.state._id} />
        <label>
          Package :
          <br />
          <input
            type="String"
            name="packageName"
            required
            value={this.state.packageName}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Description :
          <br />
          <input
            type="String"
            name="description"
            required
            value={this.state.description}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Long Description :
          <br />
          <input type="String"
            name="longdescrip"
            value={this.state.longdescrip}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Duration :
          <br />
          <input
            type="Number"
            name="duration"
            value={this.state.duration}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Price :
          <br />
          <input
            type="Number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Date from :
          <br />
          <input
            type="date"
            name="fromDate"
            value={this.state.fromDate}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Date End :
          <br />
          <input
            type="date"
            name="endDate"
            value={this.state.endDate}
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


export default PackageOperations;
