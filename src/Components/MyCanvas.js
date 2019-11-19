import React from 'react';
import {fabric} from 'fabric';
import canvasImage from '../Images/Grid-yellow.png';
import store from '../index';
import {HEAD_SIZE} from './Helpers/CanvasDrawHelper';
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
        if (active[i].type !== "input" &&
            active[i].type !== "output" &&
            active[i].type !== "line")
        {
          store.dispatch({type: "REMOVE_COMP", comp: active[i].name, id: active[i].id});

          //In the future take into account editing
          //Remove all ports and the object
          this.canvas.remove( active[i].port.input,
                              active[i].port.output,
                              ...active[i].outputs,
                              ...active[i].inputs,
                              active[i], );

          this.props.canvas.renderAll();
        }
      }

      //Deleting supporting canvas objects

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
    event.target.set({
        hasControls: false,
    });
    var objects = this.canvas.getActiveObjects()
    if (objects.length === 1)
    {
      console.log(objects[0].left + ", " + objects[0].top)
    }
    //Multiple objects selected
    else if (objects.length > 1)
    {
      for (var i = 0; i < objects.length; i++)
      {
        //Add all lines and ports into the group too to be moved
        var selectionGroup = this.canvas.getActiveObject();
        //Adding ports into selection group to be moved.
        objects[i].port.input.set({left: objects[i].left - HEAD_SIZE ,
                                    top: objects[i].top + objects[i].height/2})
        objects[i].port.output.set({ left: objects[i].left + objects[i].width,
                                      top: objects[i].top + objects[i].height/2})

        //Adding input lines into ports to be moved
        for (var obj of objects[i].inputs)
        {
          //take in the line's left top and compare with box's left top
          obj.set({ left: obj.left - selectionGroup.left - selectionGroup.width/2,
                    top: obj.top - selectionGroup.top - selectionGroup.height/2})
          console.log(obj)

        }
        this.canvas.getActiveObject().add(objects[i].port.input,
                                          objects[i].port.output,
                                          ...objects[i].inputs)
      }
    }
  }

  resetLinesPos = (event) => {
    //Handle multiple objects selection for lines
    for (let obj in this.canvas.getObjects())
    {
      //if actual component canvas object
      if (obj.inputs && obj.outputs)
      {
        //Reset line positions
        obj.port.input.set({ top: obj.top + obj.height/2,
                            left: obj.left - HEAD_SIZE,

                            })
        obj.port.input.setCoords();

        obj.port.output.set({ top: obj.top + obj.height/2,
                              left: obj.left + obj.width,})
        obj.port.output.setCoords();


        for (let connection in obj.inputs)
        {
          connection.set({x2: obj.port.input.left,
                          y2: obj.port.input.top})
          connection.setCoords();
        }

        for (let connection in obj.outputs)
        {
          connection.set({x1: obj.port.output.left,
                          y1: obj.port.output.top})
          connection.setCoords();
        }
      }
    }
  }

  setCanvasToRedux(canvas) {
    setTimeout(()=>{store.dispatch({type: "UPDATE_CANVAS", canvas: canvas});
                    this.forceUpdate()},200);
  }

  addPanZoomFunctions(canvas) {
    setTimeout(()=>{
      canvas.on('mouse:wheel', function(opt) {

        var delta = opt.e.deltaY;
          var zoom = canvas.getZoom();
          zoom = zoom + delta/400;
          if (zoom > 5) zoom = 5;
          if (zoom < 0.5) zoom = 0.5;
          canvas.zoomToPoint({ x: opt.e.x, y: opt.e.y }, zoom);
          opt.e.preventDefault();
          opt.e.stopPropagation();
          var vpt = this.viewportTransform;
          if (zoom < 800 / 1000) {
            this.viewportTransform[4] = 200 - 1000 * zoom / 2;
            this.viewportTransform[5] = 200 - 1000 * zoom / 2;
          } else {
            if (vpt[4] >= 0) {
              this.viewportTransform[4] = 0;
            } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
              this.viewportTransform[4] = canvas.getWidth() - 1000 * zoom;
            }
            if (vpt[5] >= 0) {
              this.viewportTransform[5] = 0;
            } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
              this.viewportTransform[5] = canvas.getHeight() - 1000 * zoom;
            }
      }})
      canvas.on('mouse:down', function(opt) {
        var evt = opt.e;
        if (evt.altKey === true) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });
      canvas.on('mouse:move', function(opt) {
        if (this.isDragging) {
          var e = opt.e;
          this.viewportTransform[4] += e.clientX - this.lastPosX;
          this.viewportTransform[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });

      canvas.on('mouse:up', function(opt) {
        this.isDragging = false;
        this.selection = true;

        for (let obj of canvas.getObjects())
        {
          if (obj.inputs && obj.outputs)
          {
            obj.setCoords();
          }
        }
      });
    },300);
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
    this.canvas.on("selection:cleared", (e)=>this.resetLinesPos(e));
    this.addPanZoomFunctions(this.canvas);
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
