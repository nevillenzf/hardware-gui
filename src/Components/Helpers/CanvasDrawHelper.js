import {fabric} from 'fabric';
import store from '../../index';
import { initLine } from './ConnectHelper';

export const HEAD_SIZE = 10;

//Exported function to draw a component on the canvas, while rendering it in
//the side bar
export function drawComponent(canvas,info,id) {
  var obj;

  if (info.name === "Module 1")
  {
    obj = drawSquare(canvas,info,id);
  }
  else if (info.name === "Module 2")
  {
    obj = drawCircle(canvas,info,id);
  }
  else if (info.name === "Module 3")
  {
    obj = drawText(canvas,info,id);
  }
  else {
    obj = drawText(canvas,info,id);
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
export function showModule(obj, option) {
  if (option === "double" )
  {
    store.dispatch({type: "SHOW_INFO_WINDOW", show: false});
    store.dispatch({type: "SHOW_INFO_WINDOW", show: true});
  }

}

//Janky code to update peripheral shape positions - input, output ports
function updateControlsPos(obj) {
  //console.log("spam")
  obj.port.input.set({ top: obj.top + obj.height/2 - HEAD_SIZE/2,
                      left: obj.left - HEAD_SIZE,

                      })
  obj.port.input.setCoords();

  obj.port.output.set({ top: obj.top + obj.height/2 - HEAD_SIZE/2,
                        left: obj.left + obj.width,})
  obj.port.output.setCoords();

  //Check if lines exist and select them

}

//Code to add shape peripherals - input and output port
export function addCustomControls(canvas,obj) {
  //Create 2 rectangles on the sides of the obj
  var inputPort = new fabric.Rect({ height: HEAD_SIZE,
                                    width: HEAD_SIZE,
                                    selectable: false,
                                    top: obj.top + obj.height/2 - HEAD_SIZE/2,
                                    left: obj.left - HEAD_SIZE,
                                    fill: "rgba(0, 0, 0, 1)",
                                    type: "input",
                                    parent: obj,
                                    hoverCursor: "grab",
                                    })

  var outputPort = new fabric.Rect({ height: HEAD_SIZE,
                                    width: HEAD_SIZE,
                                    selectable: false,
                                    top: obj.top + obj.height/2 - HEAD_SIZE/2,
                                    left: obj.left + obj.width,
                                    fill: "rgba(0, 0, 0, 1)",
                                    type: "output",
                                    parent: obj,
                                    hoverCursor: "grab",
})
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
function drawSquare(canvas,info,id)  {
  //At the moment it adds it to the top left corner
  var rect = new fabric.Rect({ height: 100,
                                width: 100,
                                name: info.name,
                                maxInputs: info.inputs,
                                maxOutputs: info.outputs,
                                id: id,
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
function drawCircle(canvas,info,id)  {
  //At the moment it adds it to the top left corner
  var circ = new fabric.Circle({  radius: 100,
                                  fill:'red',
                                  name:info.name,
                                  maxInputs: info.inputs,
                                  maxOutputs: info.outputs,
                                  id:id,
                                  inputs: [],
                                  outputs: [],});
  console.log(circ);

  return circ;
}

function drawText(canvas,info,id)  {
  //At the moment it adds it to the top left corner
  var text = new fabric.Text( info.name,{name:info.name,
                                    id:id,
                                    fontSize: 20,
                                    width: 100,
                                    maxInputs: info.inputs,
                                    maxOutputs: info.outputs,
                                    inputs: [],
                                    outputs: [],});
  console.log(text);

  return text;
}
