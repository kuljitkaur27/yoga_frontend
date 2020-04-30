import React, { Component, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Modal, Col, Button, Table, Tabs, Tab } from "react-bootstrap";

const SERVER_URL_instructors = "http://localhost:3000/instructors";

class InstructorOperations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: [],
      isOpen: false,
      editFormData: {},
      title : ''
    };

    const fetchResults = () => {
      axios.get(SERVER_URL_instructors).then((results) => {
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
    //this.setFlag = this.setFlag.bind(this);
  }

  showModal(request, i) {
    this.setState({
      isOpen: true,
      editFormData: request,
      title: 'Edit Record'
    });
  }

  // setFlag(i){
  //     debugger;
  //   if (i === 'X'){
  //     this.setState({addFlag: 'X',title: 'Add Record'});
  //   }else {
  //     this.setState({addFlag: ' ',title: 'Edit Record'});
  //   }
  // }

  showAddModal() {
    this.setState({
      isOpen: true,
      editFormData: {
        id: "",
        name: "",
        specialist: "",
        experience: "",
        image: "",
        linkedIn: "",
        instagram: "",
        facebook: "",
        admin: false,
        adminList: [
          { id: false, text: "No" },
          { id: true, text: "Yes" },
        ]
      }
    });
    this.setState({title: 'Add Record'});
    //this.setFlag('X');
  }

  onShowModal() {
    if(this.state.title == 'Edit Record') {
      let request = this.state.editFormData;
      this.refs.editForm.setState({
        _id: request._id,
        name: request.name,
        specialist: request.specialist,
        experience: request.experience,
        image: request.image,
        linkedIn: request.linkedIn,
        instagram: request.instagram,
        facebook: request.facebook,
        admin: request.admin,
        adminList: [
          { id: false, text: "No" },
          { id: true, text: "Yes" },
        ]
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
    axios.get(SERVER_URL_instructors).then((response) => {
      this.setState({ formdata: response.data});
    });
    //.catch(err => { console.log('Something bad is happened:', err) });
  }

  deleteRecord(i) {
    let data = this.state.formdata[i];
    var id = data._id;

    alert("are you sure you want to Delete this item ?");

    axios.delete(`${SERVER_URL_instructors}/${id}`).then((result) => {
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
              <th>Specialist</th>
              <th>Experience</th>
              <th>Image</th>
              <th>LinkedIn</th>
              <th>Instagram</th>
              <th>Facebook</th>
              <th>Admin Rights</th>
            </tr>
          </thead>
          <tbody>
            {this.state.formdata.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.specialist}</td>
                <td>{item.experience}</td>
                <td>{item.image}</td>
                <td>
                  <a href={item.linkedIn}>LinkedIn</a>
                </td>
                <td>
                  <a href={item.instagram}>Instagram</a>
                </td>
                <td>
                  <a href={item.facebook}>Facebook</a>
                </td>
                <td>{item.admin==true?'Yes':'No'}</td>
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
      id: "",
      name: "",
      specialist: "",
      experience: "",
      image: "",
      linkedIn: "",
      instagram: "",
      facebook: "",
      admin: false,
      adminList: [
        { id: false, text: "Yes" },
        { id: true, text: "No" },
      ],
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
      axios.put(`${SERVER_URL_instructors}/${id}`, this.state).then((result) => {
        this.props.save();
        this.setState({
          _id: "",
          name: "",
          specialist: "",
          experience: "",
          image: "",
          linkedIn: "",
          instagram: "",
          facebook: "",
          admin: false,
          adminList: [
            { id: false, text: "No" },
            { id: true, text: "Yes" },
          ]
        });
      });
    } else {
      axios.post(`${SERVER_URL_instructors}`, this.state).then((result) => {
        this.props.save();
        this.setState({
          _id: "",
          name: "",
          specialist: "",
          experience: "",
          image: "",
          linkedIn: "",
          instagram: "",
          facebook: "",
          admin: false,
          adminList: [
            { id: false, text: "No" },
            { id: true, text: "Yes" },
          ]
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
          Specialist:
          <br />
          <input
            type="String"
            name="specialist"
            required
            value={this.state.specialist}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Experience:
          <br />
          <input
            type="String"
            name="experience"
            required
            value={this.state.experience}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Image:
          <br />
          <input
            type="String"
            name="image"
            value={this.state.image}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          LinkedIn:
          <br />
          <input
            type="String"
            name="linkedIn"
            value={this.state.linkedIn}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Instagram:
          <br />
          <input
            type="String"
            name="instagram"
            value={this.state.instagram}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Facebook:
          <br />
          <input
            type="String"
            name="facebook"
            value={this.state.facebook}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Admin:
          <br />
          <select
            name="admin"
            value={this.state.admin}
            onChange={this.handleChange}
          >
            {this.state.adminList.map((adminItem) => (
              <option key={adminItem.id} value={adminItem.id}>
                {adminItem.text}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Save</button>
        <br />
      </form>
    );
  }
}

export default InstructorOperations;
