import React, { Component, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Modal, Col, Button, Table, Tabs, Tab } from 'react-bootstrap';

const SERVER_URL_instructors = 'http://localhost:3000/instructors';
const SERVER_URL_classes = 'http://localhost:3000/classes';
const SERVER_URL_packages = 'http://localhost:3000/packages';
const SERVER_URL_yogas = 'http://localhost:3000/yogas';
const SERVER_URL_members = 'http://localhost:3000/members';

class Admin extends Component{
  render(){
    return(
      <div>
        <Tabs defaultActiveKey="instructors" id="tabs">
          <Tab eventKey="instructors" title="Instructors" >
            <Instructors />
          </Tab>
          <Tab eventKey="classes" title="Classes">
            <Classes />
          </Tab>
          <Tab eventKey="packages" title="Packages" >
            <Packages />
          </Tab>
          <Tab eventKey="yogas" title="Yoga" >
            <Yogas />
          </Tab>
          <Tab eventKey="members" title="Members" >
            <Members />
          </Tab>
        </Tabs>

      </div>
    )
  }
}

//****************************************************************************
//Instructors or User
class Instructors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formdata: [],
      isOpen : false,
      editFormData : {}
    };

    this.onSave = this.onSave.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    const fetchResults = () => {
      axios.get(SERVER_URL_instructors).then((results) => {
        this.setState({ formdata: results.data });
      });
    };

  fetchResults();
    this.deleteRecord = this.deleteRecord.bind(this);
    this.editRecord = this.editRecord.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.onSave = this.onSave.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onShowModal = this.onShowModal.bind(this);
  }

  showModal(request, i){
    //let request = this.state.formdata[i];
    this.setState({
      isOpen: true,
      editFormData: request
    });
  }

  onShowModal(){
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
      admin: request.admin
    });
  }

  hideModal(){
    this.setState({ isOpen: false});
  }


 onSubmit = (event) => {
      event.preventDefault(event);
      console.log(event.target.name.value);
      console.log(event.target.email.value);
    };

  handleChange(data, e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSave() {
    axios.get(SERVER_URL_instructors)
      .then(response => {
          this.setState({ formdata: response.data});
        })
      //.catch(err => { console.log('Something bad is happened:', err) });
  }

  deleteRecord(i) {
    let data = this.state.formdata[i];
    var id = data._id;

    alert("are you sure you want to Delete this item ?");


    axios
      .delete(`${SERVER_URL_instructors}/${id}`)
      .then((result) => {
        this.setState({
          formdata: this.state.formdata.filter((item, index) => {
            return index !== i;
          })
        });
      });
  }

  onSave() {
    debugger;
      axios.get(SERVER_URL_instructors)
        .then(response => {
            this.setState({ formdata: response.data});
          })
        //.catch(err => { console.log('Something bad is happened:', err) });
    }

 editRecord(i) {
    // let request = this.state.formdata[i];
    // this.refs.editForm.setState({
    //     _id: request._id,
    //     name: request.name,
    //     specialist: request.specialist,
    //     experience: request.experience,
    //     image: request.image,
    //     linkedIn: request.linkedIn,
    //     instagram: request.instagram,
    //     facebook: request.facebook,
    //     admin: request.admin
    // });
  }


  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Specialist</th>
              <th>Experience</th>
              <th>Image</th>
              <th>LinkedIn</th>
              <th>Instagram</th>
              <th>facebook</th>
              <th>admin</th>
            </tr>
          </thead>
          <tbody>
            {this.state.formdata.map((item, i) => (
              <tr key={i}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.specialist}</td>
                <td>{item.experience}</td>
                <td>{item.image}</td>
                <td><a href={item.linkedIn}>LinkedIn</a></td>
                <td><a href={item.instagram}>Instagram</a></td>
                <td><a href={item.facebook}>Facebook</a></td>
                <td>{item.admin}</td>
                <td>

                <Button
                  variant="info"
                  onClick={()=>this.showModal(item, i)}>
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
        <Modal ref='editModal' show={this.state.isOpen} onShow={()=>this.onShowModal()} onHide={this.hideModal} >
          <Modal.Header>
            <Modal.Title>Edit Record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Edit ref='editForm' save={this.onSave}/>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.hideModal}>Cancel</button>
            <button onClick={this.onSave}>Save</button>
          </Modal.Footer>
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
     specialist: '',
     experience: '',
     image: '',
     linkedIn: '',
     instagram: '',
     facebook: '',
     admin: [0, 1]
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name] : event.target.value});
  }

  handleSubmit(event) {
    // event.preventDefault();

    let id = this.state._id;
    axios.put(`${SERVER_URL_instructors}/${id}`, this.state)
      .then(
        (result) => {
debugger;
          this.props.save();
          this.setState(
            {
              _id: '',
              name: '',
              specialist: '',
              experience: '',
              image: '',
              linkedIn: '',
              instagram: '',
              facebook: '',
              admin: ''
          });
        }
      )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Id:<br/>
          <input
          type="text"
          name='_id'
          onChange={this.handleChange}
          value={this.state._id} readOnly={true}/>
        </label>
        <label>Name:<br/>
        <input
          type="String"
          name='name'
          value={this.state.name}
          onChange={this.handleChange} />
        </label>
        <label>
          Specialist:<br/>
          <input
            type="String"
            name='specialist'
            value={this.state.specialist}
            onChange={this.handleChange} />
        </label>
        <label>
          Experience:
          <input
            type="String"
            name='experience'
            value={this.state.experience}
            onChange={this.handleChange} />
        </label>
        <label>
          Image:
          <input
            type="String"
            name='image'
            value={this.state.image}
            onChange={this.handleChange} />
        </label>
        <label>
          LinkedIn:<br/>
          <input
            type="String"
            name="linkedIn"
            value={this.state.linkedIn}
            onChange={this.handleChange}/>
        </label>
        <label>
          Instagram:<br/>
          <input
            type="String"
            name="instagram"
            value={this.state.instagram}
            onChange={this.handleChange}/>
        </label>
        <label>
          Facebook:<br/>
          <input
            type="String"
            name="facebook"
            value={this.state.facebook}
            onChange={this.handleChange}/>
        </label>
        <label>
          Admin:<br/>
          <select
            name="admin"
            value={this.state.admin}
            onChange={this.handleChange}>
              <option key={this.state.admin} value={this.state.admin}>
                {this.state.admin}
              </option>
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    );
  }
}

//****************************************************************************
//Classes or timetable
class Classes extends Component {
  constructor(props) {
    super(props);
    // this.state = { apiRes1: "" };

    this.state = {
      formdata: []
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
    this.setState({[e.target.name]: e.target.value});
  }

  onSave() {
    axios.get(SERVER_URL_classes)
      .then(response => {
          this.setState({ formdata: response.data});
        })
      //.catch(err => { console.log('Something bad is happened:', err) });
  }

  deleteRecord(i) {
    let data = this.state.formdata[i];
    var id = data._id;

    alert("are you sure you want to Delete this item ?");
    this.setState({
      formdata: this.state.formdata.filter((item, index) => {
        return index !== i;
      })
    });

    axios
      .delete(`${SERVER_URL_classes}/${id}`)
      .then((result) => {
      });
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
        yoga: request.yoga
    });
  }

  render() {
    let from = '', to = '', timeFrom = '', timeTo = '';
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
                <td>{item.fromDate}</td>
                <td>{item.to}</td>
                <td>{item.timeFrom}</td>
                <td>{item.timeTo}</td>
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
//****************************************************************************
//Packages
class Packages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formdata: []
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
    this.setState({[e.target.name]: e.target.value});
  }

  onSave() {
    axios.get(SERVER_URL_packages)
      .then(response => {
          this.setState({ formdata: response.data});
        })
      //.catch(err => { console.log('Something bad is happened:', err) });
  }

  deleteRecord(i) {
    let data = this.state.formdata[i];
    var id = data._id;

    alert("are you sure you want to Delete this item ?");
    this.setState({
      formdata: this.state.formdata.filter((item, index) => {
        return index !== i;
      })
    });

    axios
      .delete(`${SERVER_URL_packages}/${id}`)
      .then((result) => {
      });
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
        endDate: request.endDate
    });
  }

  render() {
    let from = '', to = '', timeFrom = '', timeTo = '';
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
//****************************************************************************
//Yogas
class Yogas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formdata: []
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
    this.setState({[e.target.name]: e.target.value});
  }

  onSave() {
    axios.get(SERVER_URL_yogas)
      .then(response => {
          this.setState({ formdata: response.data});
        })
      //.catch(err => { console.log('Something bad is happened:', err) });
  }

  deleteRecord(i) {
    let data = this.state.formdata[i];
    var id = data._id;

    alert("are you sure you want to Delete this item ?");
    this.setState({
      formdata: this.state.formdata.filter((item, index) => {
        return index !== i;
      })
    });

    axios
      .delete(`${SERVER_URL_yogas}/${id}`)
      .then((result) => {
      });
  }

  editRecord(i) {
    let request = this.state.formdata[i];
    this.refs.editForm.setState({
        id: request._id,
        yoga: request.yoga,
        description: request.description
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
//****************************************************************************
//Members
class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formdata: []
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
    this.setState({[e.target.name]: e.target.value});
  }

  onSave() {
    axios.get(SERVER_URL_members)
      .then(response => {
          this.setState({ formdata: response.data});
        })
  }

  deleteRecord(i) {
    let data = this.state.formdata[i];
    var id = data._id;

    alert("are you sure you want to Delete this item ?");
    this.setState({
      formdata: this.state.formdata.filter((item, index) => {
        return index !== i;
      })
    });

    axios
      .delete(`${SERVER_URL_members}/${id}`)
      .then((result) => {
      });
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
        counter: request.counter
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


export default Admin;
