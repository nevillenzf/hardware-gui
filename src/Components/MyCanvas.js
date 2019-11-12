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
    this.keyUpKing = this.keyUpKing.bind(this);
    this.mouseEventKing = this.mouseEventKing.bind(this);
  }

  keyUpKing = (event) => {
    if(event.key === 'Enter'){
      console.log(this.canvas)
    }
    else if (event.key === "Backspace")
    {
      //Check canvas for active object then delete from everywhere
      var active = this.canvas.getActiveObjects();

      for (var i = 0 ; i < active.length; i++)
      {
        //Removing from myCompList
        store.dispatch({type: "REMOVE_COMP", comp: active[i].name, id: active[i].id});

        //In the future take into account editing
        //Remove all ports and the object
        this.canvas.remove(active[i].port.input, active[i].port.output, active[i]);
        this.props.canvas.renderAll();
      }
    }

  }

  mouseEventKing = (event) => {
    //Only evaluate if info window is present
    if (this.props.show)
    {
      if (this.props.canvas.getActiveObjects().length < 1)
      {
        store.dispatch({type: "SHOW_INFO_WINDOW", show: false});
      }
      else {
        store.dispatch({type: "SHOW_INFO_WINDOW", show: false});
        store.dispatch({type: "SHOW_INFO_WINDOW", show: true});

      }
    }
  }

  selectionListener = (event) => {
    //Only allows for single object selection
    if (this.canvas.getActiveObjects().length === 1)
    {
      console.log(this.canvas.getActiveObjects()[0].left + ", " + this.canvas.getActiveObjects()[0].top)
    }
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

    this.setCanvasToRedux(this.canvas);
    var canvasWrapper = document.getElementsByClassName('MyCanvas')[0];
    canvasWrapper.tabIndex = 1000;
    canvasWrapper.addEventListener("keydown", (e) => this.keyUpKing(e) , false);
    canvasWrapper.addEventListener("click", (e) => this.mouseEventKing(e) , false);

    //Created - initial selection instance
    //Updated - is when something is selected, and something else is then selected
    this.canvas.on("selection:updated", (e)=>this.selectionListener(e));
    this.canvas.on("selection:created", (e)=>this.selectionListener(e));


  }

  componentWillUnmount(){
    var canvasWrapper = document.getElementById('main-canvas');

    canvasWrapper.removeEventListener("keydown", (e) => this.keyUpKing(e) , false);
    canvasWrapper.removeEventListener("onclick", (e) => this.mouseEventKing(e) , false);

  }

  render() {
    return (
      <div className="MyCanvas" >
        <canvas id="main-canvas"></canvas>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    canvas: state.myCanvas,
    show: state.showInfoWindow,
  }
}

MyCanvas = connect(mapStateToProps)(MyCanvas);


export default MyCanvas;
