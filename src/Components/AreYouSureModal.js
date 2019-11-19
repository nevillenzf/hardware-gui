import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class AreYouSureModal extends React.Component {

  render()
  {
    return(
      <div>
        <Modal show={this.props.show} onHide= {this.props.onHide} size={this.props.size}>
          <Modal.Header closeButton className="ModuleHeader">
            <Modal.Title>New Canvas?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <div>
            You will lose all unsaved changes.
          </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="success" onClick={() => window.location.reload()}>
              New Canvas
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

export default AreYouSureModal;
