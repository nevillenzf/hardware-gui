import React from 'react';
import PartWindow from './PartWindow'
import {connect} from 'react-redux';
import { drawComponent } from './Helpers/CanvasDrawHelper';
import store from '../index';
import { DragPreviewImage, useDrag } from 'react-dnd'

class PartCard extends React.Component {

  constructor() {
    super();
    this.addComponent = this.addComponent.bind(this);
    this.addNewComponent = this.addNewComponent.bind(this);
  }

  addComponent() {
    //Draw square and assign name
    //This time ar
    drawComponent(this.props.canvas, this.props.name, this.props.count);
    store.dispatch({type: "UPDATE_COMP_LIST", comp: this.props.name, id: this.props.count});

    this.props.increment();
    this.props.canvas.renderAll();

  }

  addNewComponent() {
    //Draw square and assign name
    //console.log(this.props);
    this.props.openModal();
  }

  render() {
    if (this.props.name === "Add a Module")
    {
      return (
        <div  className="PartCard"
              onClick={this.addNewComponent}>

          <PartWindow name={this.props.name}
                      desc={this.props.desc}
                      passed_key={this.props.passed_key}
                      />
        </div>
      )
    }
    else
    {
      return (
        <div  className="PartCard"
              onClick={this.addComponent}>

          <PartWindow name={this.props.name}
                      desc={this.props.desc}
                      inputs={this.props.inputs}
                      outputs={this.props.outputs}
                      passed_key={this.props.passed_key}
                      />
        </div>
      );
    }
  }

}

const mapStateToProps = state => {
  return {
    canvas: state.myCanvas,
    myCompList: state.myCompList,
  }
}

PartCard = connect(mapStateToProps)(PartCard);

export default PartCard;
