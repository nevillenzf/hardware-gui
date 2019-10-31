import React from 'react';
import PartsDeck from './PartsDeck';
import '../Styles/Stylesheet.css';

class TopDash extends React.Component {
  //In this component include navbar on the top, scrolling section
  render() {
    return (
      <div className="TopDash">
        <PartsDeck />
      </div>
    );
  }

}

export default TopDash;
