import React from 'react';
import PartWindow from './PartWindow'
import {connect} from 'react-redux';
import { drawComponent } from './Helpers/CanvasDrawHelper';
import store from '../index';
import { DragSource } from 'react-dnd'

class PartCard extends React.Component {

  constructor() {
    super();
    this.addComponent = this.addComponent.bind(this);
    this.addNewComponent = this.addNewComponent.bind(this);
  }

  addComponent() {
    //Draw square and assign name
    //This time ar
    var info = {name: this.props.name,
                desc: this.props.desc,
                inputs: this.props.inputs,
                outputs: this.props.outputs}
    drawComponent(this.props.canvas, info, this.props.count);
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

          <PartThing name={this.props.name}
                      desc={this.props.desc}
                      inputs={this.props.inputs}
                      outputs={this.props.outputs}
                      passed_key={this.props.passed_key}/>
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

const spec = {
  beginDrag(props, monitor, component)
  {
    const item = {...props};
    return item;
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
  }
}

const PartThing = DragSource("part-deck", spec, collect)(props => {
  const { connectDragSource } = props;
  return connectDragSource(<div><PartWindow name={props.name}
              desc={props.desc}
              inputs={props.inputs}
              outputs={props.outputs}
              passed_key={props.passed_key}
              />
            </div>)
})
PartCard = connect(mapStateToProps)(PartCard);

export default PartCard;
