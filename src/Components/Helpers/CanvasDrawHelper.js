import {fabric} from 'fabric';
import store from '../../index';

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

  canvas.add(obj);

  //Events for objects
  obj.on("mousedblclick", (e)=> {showModule(obj, "double")});
  obj.on("mousedown", (e)=> {showModule(obj, "single")});

  //FIXME: Maybe have tooltip show up on hover?
  //obj.on("mouseover", (e)=> {console.log("Show tooltip")});


  //Display module information
  //store.dispatch({type: "REMOVE_COMP", comp: this.props.name, id: this.props.passed_key});

}

//Janky code to show module info in a info window
function showModule(obj, option) {
  if (option === "double" )
  {
    store.dispatch({type: "SHOW_INFO_WINDOW", show: false});
    store.dispatch({type: "SHOW_INFO_WINDOW", show: true});
  }

}

//Draws a square on the top left corner of the canvas
function drawSquare(canvas,name,id)  {
  //At the moment it adds it to the top left corner
  var rect = new fabric.Rect({ height: 100,
                                width: 100,
                                name:name,
                                id:id,
                                cornerSize: 20,
                                transparentCorners: false
                                });
  //rect.set({"lockScaling" : true});
  console.log(rect);
  rect.setControlsVisibility({bl: false, br: false, tl: false, tr: false,
                              mt: false, mb: false, ml: false, mr: false});

  return rect;
}

//Draws a circle on the top left corner of the canvas
function drawCircle(canvas,name,id)  {
  //At the moment it adds it to the top left corner
  var circ = new fabric.Circle({ radius: 100, fill:'red', name:name, id:id});
  console.log(circ);

  return circ;
}

function drawText(canvas,name,id)  {
  //At the moment it adds it to the top left corner
  var text = new fabric.Text( name,{name:name, id:id, fontSize: 20, width: 100});
  console.log(text);

  return text;
}
