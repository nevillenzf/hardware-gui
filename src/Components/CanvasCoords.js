import React from 'react';
import '../Styles/Stylesheet.css';

class CanvasCoords extends React.Component {
  //In this component include navbar on the top, scrolling section
  render() {
    return (
      <div className="CanvasCoords">
        {this.props.canvas ? this.props.canvas.vptCoords.tl : 0},
        {this.props.canvas ? this.props.canvas.vptCoords.tl : 0}
      </div>
    );
  }

}

export default CanvasCoords;
