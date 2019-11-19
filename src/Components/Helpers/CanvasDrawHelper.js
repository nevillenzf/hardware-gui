import {fabric} from 'fabric';
import store from '../../index';
import { initLine } from './ConnectHelper';

export const HEAD_SIZE = 10;

//Exported functio nto draw a component on the canvas, while rendering it in
//the side bar
export function drawComponent(canvas,name,id) {
  var obj;
  if (name === "Module 1")
  {
    obj = drawSquare(canvas,name,id);
  }
  else if (name === "Module 2")
  {
    obj = drawCircle(canvas,name,id);
  }
  else if (name === "Module 3")
  {
    obj = drawText(canvas,name,id);
  }
  else {
    obj = drawText(canvas,name,id);
  }
  //Remove default controls
  obj.set({ hasControls: false });
  //Set location
  obj.set({top: canvas.height/(2 * canvas.getZoom()) - canvas.viewportTransform[4]/(2 * canvas.getZoom()),
          left: canvas.width/(2 * canvas.getZoom()) - canvas.viewportTransform[5]/(2 * canvas.getZoom())})
  //Add custom controls
  addCustomControls(canvas, obj);

  canvas.add(obj);

  //Events for objects
  obj.on("mousedblclick", (e)=> {showModule(obj, "double")});
  obj.on("mousedown", (e)=> {showModule(obj, "single")});
  //FIXME: Maybe have tooltip show up on hover?
  //obj.on("mouseover", (e)=> {console.log("Show tooltip")});

}

//Janky code to show module info in a info window
function showModule(obj, option) {
  if (option === "double" )
  {
    store.dispatch({type: "SHOW_INFO_WINDOW", show: false});
    store.dispatch({type: "SHOW_INFO_WINDOW", show: true});
  }

}

//Janky code to show module info in a info window
function updateControlsPos(obj) {
  //console.log("spam")
  obj.port.input.set({ top: obj.top + obj.height/2,
                      left: obj.left - HEAD_SIZE,

                      })
  obj.port.input.setCoords();

  obj.port.output.set({ top: obj.top + obj.height/2,
                        left: obj.left + obj.width,})
  obj.port.output.setCoords();

  //Check if lines exist and select them

}

export function addCustomControls(canvas,obj) {
  //Create 2 rectangles on the sides of the obj
  var inputPort = new fabric.Rect({ height: HEAD_SIZE,
                                    width: HEAD_SIZE,
                                    selectable: false,
                                    top: obj.top + obj.height/2,
                                    left: obj.left - HEAD_SIZE,
                                    fill: "rgba(124, 196, 142, 1)",
                                    type: "input",
                                    parent: obj,
                                    })

  var outputPort = new fabric.Rect({ height: HEAD_SIZE,
                                    width: HEAD_SIZE,
                                    selectable: false,
                                    top: obj.top + obj.height/2,
                                    left: obj.left + obj.width,
                                    fill: "rgba(124, 196, 142, 1)",
                                    type: "output",
                                    parent: obj})
  //Add custom onclick functions
  //ON MOUSE DOWN
  inputPort.on("mousedown", (e)=> {canvas.setActiveObject(obj)});
  inputPort.on("mousedblclick", (e)=> {showModule(obj, "double")});

  //Can drag output to another input
  outputPort.on("mousedown", (e)=> {initLine(canvas, outputPort,obj)});

  outputPort.on("mousedblclick", (e)=> {showModule(obj, "double")});

  obj.set({port: {input: inputPort, output: outputPort}})

  canvas.add(inputPort)
  canvas.add(outputPort)
  inputPort.bringToFront();
  outputPort.bringToFront();

  obj.on("moving", (e)=> {updateControlsPos(obj)});
  //obj.on("mouseup", (e)=> {resetMouseListeners(canvas, obj)})

}

//Draws a square on the top left corner of the canvas
function drawSquare(canvas,name,id)  {
  //At the moment it adds it to the top left corner
  var rect = new fabric.Rect({ height: 100,
                                width: 100,
                                name:name,
                                id:id,
                                cornerSize: 20,
                                transparentCorners: false,
                                left: 200,
                                top: 200,
                                inputs: [],
                                outputs: [],
                                });
  //rect.set({"lockScaling" : true});
  console.log(rect);


  return rect;
}

//Draws a circle on the top left corner of the canvas
function drawCircle(canvas,name,id)  {
  //At the moment it adds it to the top left corner
  var circ = new fabric.Circle({  radius: 100,
                                  fill:'red',
                                  name:name,
                                  id:id,
                                  inputs: [],
                                  outputs: [],});
  console.log(circ);

  return circ;
}

function drawText(canvas,name,id)  {
  //At the moment it adds it to the top left corner
  var text = new fabric.Text( name,{name:name,
                                    id:id,
                                    fontSize: 20,
                                    width: 100,
                                    inputs: [],
                                    outputs: [],});
  console.log(text);

  return text;
}
