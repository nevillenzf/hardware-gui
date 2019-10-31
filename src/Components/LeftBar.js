import React from 'react';
import ComponentList from './ComponentList';
import '../Styles/Stylesheet.css';

class LeftBar extends React.Component {
  //In this component include navbar on the top, scrolling section
  render() {
    return (
      <div className="LeftBar">
        <ComponentList />
      </div>
    );
  }

}

export default LeftBar;
