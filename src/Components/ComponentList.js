import React from 'react';
import {ListGroup} from 'react-bootstrap';

class ComponentList extends React.Component {
  //In this component include navbar on the top, scrolling section
  render() {
    return (
      <div className="ComponentList">
        <ListGroup>
          <ListGroup.Item action variant="dark">
            Primary
          </ListGroup.Item>
          <ListGroup.Item action variant="dark">
            Secondary
          </ListGroup.Item>
          <ListGroup.Item action variant="dark">
            Success
          </ListGroup.Item>
          <ListGroup.Item action variant="dark">
            Danger
          </ListGroup.Item>
          <ListGroup.Item action variant="dark">
            Warning
          </ListGroup.Item>
          <ListGroup.Item action variant="dark">
            Info
          </ListGroup.Item>
          <ListGroup.Item action variant="dark">
            Light
          </ListGroup.Item>
          <ListGroup.Item action variant="dark">
            Dark
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }

}

export default ComponentList;
