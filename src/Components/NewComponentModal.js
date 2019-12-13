import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import NewCompAlert from './NewCompAlert';
import store from '../index';

class NewComponentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert : false,
      errors: [],
    };
    this.renderAlert = this.renderAlert.bind(this);
  }

  handleSubmit = () => {
    //Handle form information and add them to the redux state
    //if anything is not in line, display Alert with appropriate messages
    var name = document.getElementById('formGroupName').value;
    var desc = document.getElementById('formGroupDesc').value;
    var inputs = document.getElementById('formGroupInputs').value;
    var outputs = document.getElementById('formGroupOutputs').value;

    //This is used for the alert
    var errors = [];

    //Name check
    if (name.length === 0)
    {
      errors.push("name");
    }

    //Desc check - if empty - just write "no description provided"
    if (desc.length === 0)
    {
      desc = "No Description Provided."
    }

    //input check
    if (inputs.length === 0)
    {
      //Basically infinity
      inputs = Number.MAX_VALUE;
    }
    //Something is entered here
    else
    {
      inputs = parseInt(inputs);
      //Is not an integer
      if (isNaN(inputs))
      {
        errors.push("inputs");
      }
    }

    //outputs check
    if (outputs.length === 0)
    {
      //Basically infinity
      outputs = Number.MAX_VALUE;
    }
    //Something is entered here
    else
    {
      outputs = parseInt(outputs);
      //Is not an integer
      if (isNaN(outputs))
      {
        errors.push("outputs");
      }
    }

    //Finally check if theres anything in errors -> if empty then proceed to create
    //New component and close modal, or else, Prompt Alert with the listed problems
    console.log(errors);
    if (errors.length > 0)
    {
      this.setState({ errors: errors,
                      showAlert: true});
    }
    else {
      //Part has the right description and will be created
      this.setState({ errors: errors,
                      showAlert: false});
      let newPart = {name: name, desc: desc, inputs: inputs, outputs: outputs}
      store.dispatch({type: "UPDATE_PARTS", part: newPart});
      this.props.onHide();
    }

  }

  renderAlert()
  {
    if (this.state.showAlert)
    {
      return(
        <NewCompAlert errors={this.state.errors}/>
      )
    }
  }
  render()
  {
    return(
      <div>
        <Modal show={this.props.show} onHide= {this.props.onHide} size={this.props.size}>
          <Modal.Header closeButton className="ModuleHeader">
            <Modal.Title>Define New Component</Modal.Title>
          </Modal.Header>
          {this.renderAlert()}
          <Modal.Body>
            <Form>
              <Form.Group controlId="formGroupName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter name for new Component" />
              </Form.Group>

              <Form.Group controlId="formGroupDesc">
                <Form.Label>Description</Form.Label>
                <Form.Control type="description" placeholder="Describe the new Component" />
              </Form.Group>
              <Form.Group controlId="formGroupInputs">
                <Form.Label>Inputs</Form.Label>
                <Form.Control type="description" placeholder="Number of Inputs" />
                <Form.Text className="text-muted">
                  Leave this field empty for unlimited inputs.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formGroupOutputs">
                <Form.Label>Outputs</Form.Label>
                <Form.Control type="description" placeholder="Number of Outputs" />
                <Form.Text className="text-muted">
                  Leave this field empty for unlimited outputs.
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={() => this.handleSubmit()}>
              Create Component
            </Button>

            <Button variant="secondary" onClick={this.props.onHide}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default NewComponentModal;
