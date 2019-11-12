import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {connect} from 'react-redux';
import AreYouSureModal from './AreYouSureModal';

class MyNavBar extends React.Component {
  //In this component include navbar on the top, scrolling section
  constructor(props) {
    super(props);
    this.state = {
      show : false,
    };

    this.newCanvas = this.newCanvas.bind(this);
  }

  handleClose = () => {
    this.setState({show: false});
  }

  newCanvas = () => {
    //Prompt Modal if canvas is NOT empty
    if (this.props.myCompList.length > 0)
    {
      this.setState({show: true})
    }
    else {
      window.location.reload();
    }
  }

  render() {
    return (
      <div className="MyNavBar">
      <Navbar variant="light" className="InNavBar">
        <Navbar.Brand href="#home">Example GUI</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={()=>{this.newCanvas()}}> New </Nav.Link>
          <Nav.Link> Load </Nav.Link>
          <Nav.Link href="#pricing"> Save </Nav.Link>
          <Nav.Link> Support Us! </Nav.Link>
        </Nav>
        <div>
          <AreYouSureModal  show={this.state.show}
                            size="lg"
                            onHide={this.handleClose}/>
        </div>
      </Navbar>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    canvas: state.myCanvas,
    myCompList: state.myCompList,
  }
}

MyNavBar = connect(mapStateToProps)(MyNavBar);

export default MyNavBar;
