import React from 'react';
import '../Styles/Stylesheet.css';
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap';

class ModuleInfoWindow extends React.Component {
  //In this component include navbar on the top, scrolling section
  render() {
    return (
      <div className="ModuleInfoWindow">
        <Card >
          <Card.Header className="ModuleHeader">
            <Card.Title>
              {this.props.canvas.getActiveObjects()[0].name}
            </Card.Title>
          </Card.Header >
          <Card.Body>
            <Card.Text>
              Random text to represent component description.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Cras justo odio</ListGroupItem>
            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    canvas: state.myCanvas,
  }
}

ModuleInfoWindow = connect(mapStateToProps)(ModuleInfoWindow);


export default ModuleInfoWindow;
