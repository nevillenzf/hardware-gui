import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrochip, faPlus } from '@fortawesome/free-solid-svg-icons'
class PartWindow extends React.Component {
  //Check props for parts info

  render() {
    return (
      <OverlayTrigger
        key={this.props.passed_key}
        placement={"bottom"}
        overlay={
          <Tooltip id={`tooltip-${"bottom"}`} className="partTooltip">
            {this.props.desc}
          </Tooltip> }
      >
      <div className="PartWindow">
        <div className="ComponentContainer">
          <div className="ComponentPic">
            <FontAwesomeIcon icon={this.props.name === "Add a Module" ? faPlus :faMicrochip} size="4x"/>
          </div>
          <div className="ComponentPicLabel">
          </div>
        </div>
        <div className="ComponentName">
        {this.props.name}
        </div>
      </div>

      </OverlayTrigger>
    );
  }

}

export default PartWindow;
