import React from 'react';
import {Alert} from 'react-bootstrap';

import '../Styles/Stylesheet.css';

class NewCompAlert extends React.Component {
  //In this component include navbar on the top, scrolling section
  render() {
    return (
      <Alert variant="danger">
      {this.props.errors.map((error, errorIndex) => {
          return (
              <li key={errorIndex}>
              {error === "name" ? "Please enter a name for the Component." :
              error === "inputs" ? "Please enter an integer for the input of leave the field blank.":
              "Please enter an integer for the output of leave the field blank."}
              </li>
        )
      })}
      </Alert>
    );
  }

}

export default NewCompAlert;
