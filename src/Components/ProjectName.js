import React from 'react';
import '../Styles/Stylesheet.css';

class ProjectName extends React.Component {
  //In this component include navbar on the top, scrolling section
  render() {
    return (
      <div className="ProjectName">
        {this.props.name}
      </div>
    );
  }

}

export default ProjectName;
