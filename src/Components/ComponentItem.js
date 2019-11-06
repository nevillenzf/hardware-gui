import React from 'react';
import {ListGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux';
import store from '../index';
class ComponentItem extends React.Component {
  //In this component include navbar on the top, scrolling section
  constructor() {
    super();
    this.state = ({showDeleteBtn: false}) //Part Cards are defined by {id,name,description - popover}
    this.toggleDeleteButton = this.toggleDeleteButton.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
    }

  selectObject() {
    //Iterate through all objects in Canvas - set the referred to object as active object
    for (var i = 0; i < this.props.canvas._objects.length; i++){
      if (this.props.canvas._objects[i].name === this.props.name &&
          this.props.canvas._objects[i].id === this.props.passed_key)
      {
        //Set as active object
        console.log("This object is at (" + this.props.canvas._objects[i].left + ", "
                    + this.props.canvas._objects[i].top + ")")

        this.props.canvas.setActiveObject(this.props.canvas._objects[i]);
        this.props.canvas.renderAll();
      }
    }
  }
  renderDeleteButton() {
    if (this.state.showDeleteBtn)
    {
      return(
        <button className="deleteBtn" onClick={(e)=> this.deleteComponent(e)}>
          <FontAwesomeIcon icon={faTimesCircle}/>
        </button>
      )
    }

  }

  deleteComponent(e) {
    e.stopPropagation();
    for (var i = 0; i < this.props.canvas._objects.length; i++){
      if (this.props.canvas._objects[i].name === this.props.name &&
          this.props.canvas._objects[i].id === this.props.passed_key)
      {
        console.log("Removed " + this.props.name + ", id: " + this.props.id)
        //Removed from Canvas
        this.props.canvas.remove(this.props.canvas._objects[i]);
        this.props.canvas.renderAll();

        //Removing from myCompList
        store.dispatch({type: "REMOVE_COMP", comp: this.props.name, id: this.props.passed_key});

      }
    }
  }

  toggleDeleteButton(show) {
    this.setState({showDeleteBtn: show});
  }

  render() {
    return (
          <ListGroup.Item action variant="dark"
                          className="ComponentItem"
                          onClick={()=> this.selectObject()}
                          onMouseEnter={() =>this.toggleDeleteButton(true)}
                          onMouseLeave={() => this.toggleDeleteButton(false)}>
            {this.props.name}
            {this.renderDeleteButton()}
          </ListGroup.Item>
    );
  }

}

const mapStateToProps = state => {
  return {
    canvas: state.myCanvas,
  }
}

ComponentItem = connect(mapStateToProps)(ComponentItem);

export default ComponentItem;
