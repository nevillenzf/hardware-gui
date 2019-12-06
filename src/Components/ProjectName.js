import React from 'react';
import '../Styles/Stylesheet.css';
import {connect} from 'react-redux';
import ContentEditable from 'react-contenteditable'
import store from '../index';

class ProjectName extends React.Component {
  //In this component include navbar on the top, scrolling section
  constructor() {
    super();
    this.state = {
      editing: false,
    }
  }

  onKeyPressed = evt => {
    console.log(evt.keyCode)
    if (evt.keyCode === 13)
    {
      evt.preventDefault();
      this.setState({editing: !this.state.editing});
    }
    else if (evt.keyCode === 190)
      evt.preventDefault();
  }

  handleChange = evt => {
    store.dispatch({type: "UPDATE_PROJECT_NAME", name: evt.target.value});
  };

  render() {
    return (
      <div  className="ProjectName" onDoubleClick={()=>{this.setState({editing: !this.state.editing})}}>
        <ContentEditable
              innerRef={this.contentEditable}
              html={this.props.projectName} // innerHTML of the editable div
              disabled={!this.state.editing}
              onKeyDown={this.onKeyPressed}       // use true to disable editing
              onChange={this.handleChange} // handle innerHTML change
            />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectName: state.projectName
  }
}

ProjectName = connect(mapStateToProps)(ProjectName);


export default ProjectName;
