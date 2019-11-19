import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class HelpModal extends React.Component {

  render()
  {
    return(
      <div>
        <Modal show={this.props.show} onHide= {this.props.onHide} size={this.props.size}>
          <Modal.Header closeButton className="ModuleHeader">
            <Modal.Title>What can I do?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p><h3>Canvas Commands</h3>
            <div><b>Double Click on Component</b> - Opens Component Info</div>
            <div><b>Left click on Canvas </b> - Closes Component Info</div>
            <div><b>Alt/ Option + Left Click</b> - Pan around canvas</div>
            <div><b>Mouse scroll</b> - Zoom in/out into Mouse position</div>
            <div><b>Left click + Drag output (Right) port </b> - Start to create connection between components</div>
            <div><b>Delete Button </b> - Delete Selected Component</div>
            </p>
            <p><h3>Sidebar Commands</h3>
            <div><b>Left Click on Component</b> - Opens Component Info</div>
            <div><b>Click on X Button</b> - Delete Component</div>
            </p>

          </Modal.Body>

          <Modal.Footer>

            <Button variant="secondary" onClick={this.props.onHide}>
              Got it
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default HelpModal;
