import React from 'react';
import {fabric} from 'fabric';
import canvasImage from '../Images/Grid.png';
import store from '../index';
import {connect} from 'react-redux';


class MyCanvas extends React.Component {
  //This Component is the actual fabric canvas
  constructor() {
    super();
    this.canvas = null;
    this.addObject = this.addObject.bind(this);
    this.setCanvasToRedux = this.setCanvasToRedux.bind(this);
  }

  calculateCanvasSize() {
    //console.log(window.innerHeight)
    //console.log(window.innerWidth)
  }

  setCanvasToRedux(canvas) {

    setTimeout(()=>{store.dispatch({type: "UPDATE_CANVAS", canvas: canvas});
                    this.forceUpdate()},200);
  }

  //Add object to canvas defined by the module type here
  addObject(moduleType) {
    if (moduleType === "xor_gate")
    {
      console.log(this.props.canvas)
    }

    this.canvas.renderAll();
  }

  componentDidMount() {
    // Make a New Canvas
    this.canvas = new fabric.Canvas('main-canvas', {width: this.props.width,
                                                    height: this.props.height,
                                                    backgroundColor: { source: canvasImage, repeat: 'repeat' }});
    //this.canvas.add(new fabric.Rect({ height: 100, width: 100 }))

    this.setCanvasToRedux(this.canvas)
  }

  componentDidUpdate() {
    //this.setCanvasToRedux(this.canvas);
  }

  render() {
    return (
      <div className="MyCanvas">
        <canvas id="main-canvas" z-index={-2}></canvas>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    canvas: state.myCanvas,
  }
}

MyCanvas = connect(mapStateToProps)(MyCanvas);


export default MyCanvas;
