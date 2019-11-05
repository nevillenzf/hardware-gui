import React from 'react';
import {fabric} from 'fabric';
import canvasImage from '../Images/Grid.png';
import {drawSquare} from "./Helpers/CanvasDrawHelper.js";
class MyCanvas extends React.Component {
  //This Component is the actual fabric canvas
  constructor() {
    super();
    this.canvas = null;
    this.addObject = this.addObject.bind(this);
  }

  calculateCanvasSize() {
    console.log(window.innerHeight)
    console.log(window.innerWidth)
  }

  //Add object to canvas defined by the module type here
  addObject(moduleType) {
    if (moduleType === "xor_gate")
    {
      drawSquare(this.canvas);
    }
  }

  componentDidMount() {
    // Make a New Canvas
    this.canvas = new fabric.Canvas('main-canvas', {width: this.props.width,
                                                    height: this.props.height,
                                                    backgroundColor: { source: canvasImage, repeat: 'repeat' }});
    this.canvas.add(new fabric.Rect({ height: 100, width: 100 }))
    this.calculateCanvasSize();
    this.forceUpdate();
  }

  render() {
    return (
      <div className="MyCanvas">
        <canvas id="main-canvas"></canvas>
        <button onClick={()=>{this.addObject("xor_gate")}}>test</button>
      </div>
    );
  }

}

export default MyCanvas;
