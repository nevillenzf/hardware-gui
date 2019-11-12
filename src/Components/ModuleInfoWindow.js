import React from 'react';
import '../Styles/Stylesheet.css';
import {connect} from 'react-redux';

class ModuleInfoWindow extends React.Component {
  //In this component include navbar on the top, scrolling section
  render() {
    return (
      <div className="ModuleInfoWindow">
        {this.props.canvas.getActiveObjects()[0].name}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    canvas: state.myCanvas,
  }
}

ModuleInfoWindow = connect(mapStateToProps)(ModuleInfoWindow);


export default ModuleInfoWindow;
