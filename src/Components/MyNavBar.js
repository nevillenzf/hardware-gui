import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

class MyNavBar extends React.Component {
  //In this component include navbar on the top, scrolling section
  render() {
    return (
      <div className="MyNavBar">
      <Navbar variant="light" className="InNavBar">
        <Navbar.Brand href="#home">Example GUI</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link> New </Nav.Link>
          <Nav.Link> Load </Nav.Link>
          <Nav.Link href="#pricing"> Save </Nav.Link>
          <Nav.Link> Support Us! </Nav.Link>
        </Nav>

      </Navbar>
      </div>
    );
  }

}

export default MyNavBar;
