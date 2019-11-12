import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import store from '../index';
import {connect} from 'react-redux';

class AreYouSureModal extends React.Component {

  render()
  {
    return(
      <div>
        <Modal show={this.props.show} onHide= {this.props.onHide} size={this.props.size}>
          <Modal.Header closeButton>
            <Modal.Title>Save Changes?</Modal.Title>
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

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
  }
}

AreYouSureModal = connect(mapStateToProps)(AreYouSureModal);

export default AreYouSureModal;
