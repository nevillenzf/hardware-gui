import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
            <ul><h3>Canvas Commands</h3>
              <li><b>Double Click on Component</b> - Opens Component Info</li>
              <li><b>Left click on Canvas </b> - Closes Component Info</li>
              <li><b>Alt/ Option + Left Click</b> - Pan around canvas</li>
              <li><b>Mouse scroll</b> - Zoom in/out into Mouse position</li>
              <li><b>Left click + Drag output (Right) port </b> - Start to create connection between components</li>
              <li><b>Delete Button </b> - Delete Selected Component</li>
            </ul>
            <ul><h3>Sidebar Commands</h3>
              <li><b>Left Click on Component</b> - Opens Component Info</li>
              <li><b>Click on X Button</b> - Delete Component</li>
            </ul>

          </Modal.Body>

          <Modal.Footer className= "helpFooter">
            <div className= "CreatorWrapper">
              <div className= "acknowledgement">Tool developed by Neville Ng </div>
              <a  href="https://www.github.com/nevillenzf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="socialIcon">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
              <a  href="https://www.linkedin.com/in/nevillenzf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="socialIcon">
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
            </div>
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
