import React, { Component, useState } from "react";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";
import InstructorOperations from "./InstructorOperations";
import ClassOperations from "./ClassOperations";
import PackageOperations from "./PackageOperations";
import YogaOperations from "./YogaOperations";
import MemberOperations from "./MemberOperations";


class Admin extends Component {
  render() {
    return (
      <div>
        <Tabs id="tabs">
          <Tab eventKey="instructors" title="Instructors">
            <InstructorOperations />
          </Tab>
          <Tab eventKey="classes" title="Classes">
            <ClassOperations />
          </Tab>
          <Tab eventKey="packages" title="Packages">
            <PackageOperations />
          </Tab>
          <Tab eventKey="yogas" title="Yoga">
            <YogaOperations />
          </Tab>
          <Tab eventKey="members" title="Members">
            <MemberOperations />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Admin;
