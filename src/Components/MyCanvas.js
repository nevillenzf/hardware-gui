import React from 'react';
import {fabric} from 'fabric';
import canvasImage from '../Images/Grid.png';

class MyCanvas extends React.Component {
  //This Component is the actual fabric canvas
  constructor() {
    super();
    this.canvas = null;
  }

  calculateCanvasSize() {
    console.log(window.innerHeight)
    console.log(window.innerWidth)
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
      </div>
    );
  }

}

export default MyCanvas;
