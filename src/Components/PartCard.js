import React from 'react';
import PartWindow from './PartWindow'
class PartCard extends React.Component {
  //Check props for parts info

  render() {
    return (
      <div className="PartCard">
        <PartWindow name={this.props.name} desc={this.props.desc} passed_key={this.props.passed_key}/>
      </div>
    );
  }

}

export default PartCard;
