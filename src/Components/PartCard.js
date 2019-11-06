import React from 'react';
import PartWindow from './PartWindow'
import {connect} from 'react-redux';
import { drawComponent } from './Helpers/CanvasDrawHelper';
import store from '../index';

class PartCard extends React.Component {

  constructor() {
    super();
    this.addComponent = this.addComponent.bind(this);
  }

  addComponent() {
    //Draw square and assign name
    drawComponent(this.props.canvas, this.props.name, this.props.count);
    store.dispatch({type: "UPDATE_COMP_LIST", comp: this.props.name, id: this.props.count});

    this.props.increment();
    this.props.canvas.renderAll();

  }

  render() {
    return (
      <div  className="PartCard"
            onClick={this.addComponent}>
        <PartWindow name={this.props.name}
                    desc={this.props.desc}
                    passed_key={this.props.passed_key}
                    />
      </div>
    );
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
