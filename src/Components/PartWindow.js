import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
class PartWindow extends React.Component {
  //Check props for parts info

  render() {
    return (
      <OverlayTrigger
        key={this.props.passed_key}
        placement={"bottom"}
        overlay={
          <Tooltip id={`tooltip-${"bottom"}`}>
            {this.props.desc}
          </Tooltip> }
      >
      <div className="PartWindow">
        {this.props.name}
      </div>

      </OverlayTrigger>
    );
  }

}

export default PartWindow;
