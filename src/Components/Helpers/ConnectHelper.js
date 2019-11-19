import {fabric} from 'fabric';
import store from '../../index';

const HEAD_SIZE = 10;
var isDrawing = false;
var drawing = null;
var restore = null;
//Exported functio nto draw a component on the canvas, while rendering it in
//the side bar
export function initLine(canvas, start, obj) {
  canvas.setActiveObject(obj)
  var coords = [start.left, start.top, start.left +1, start.top + 1];
  isDrawing = true;
  //Line to show where everything is
  //inputObj records the origin component of the connection
  var line = new fabric.Line(coords ,{
      fill: 'black',
      stroke: 'black',
      strokeWidth: 5,
      selectable: false,
      start_id: obj.id,
      type: "line",
      opacity: 0.5
    })

  var head = new fabric.Rect({
      left: start.left,
      top: start.top,
      fill: 'black',
      height: HEAD_SIZE,
      width: HEAD_SIZE,
      selectable: false,})

  canvas.add(line);
  canvas.add(head);

  canvas.selection = false;
  console.log(head);
  obj.on("moving", (e)=>{ line.set({x1: obj.port.output.left + HEAD_SIZE/2,
                                    y1: obj.port.output.top + HEAD_SIZE/2})
                          head.set({left: obj.port.output.left+ HEAD_SIZE/2,
                                    top: obj.port.output.top})});
  //update line position on mouse movement till mouse up
  drawing = (e) => drawLine(canvas, line, head, obj, e.pointer)
  restore = () => restoreFunctions(canvas, line, head, obj)
  canvas.on("mouse:move", drawing)
  canvas.on("mouse:up", restore)

}

function drawLine(canvas, line, head, obj, pointer) {
  if (isDrawing)
  {
    line.set({x2: pointer.x / canvas.getZoom() - canvas.viewportTransform[4]/ canvas.getZoom(),
              y2: pointer.y / canvas.getZoom() - canvas.viewportTransform[5]/ canvas.getZoom()})
    line.setCoords();
    head.set({left: pointer.x / canvas.getZoom() - canvas.viewportTransform[4]/ canvas.getZoom(),
              top: pointer.y / canvas.getZoom() - canvas.viewportTransform[5]/ canvas.getZoom()})
    head.setCoords();
    canvas.renderAll();
  }

}

function restoreFunctions(canvas, line, head, start)
{
  if (isDrawing)
  {
    //Check if line is intersecting with an object with type input
    //else just remove line
    var found = false;
    canvas.forEachObject(function(obj) {
      if (head.intersectsWithObject(obj))
      {
        //Only takes other inputs into account
        if (obj.type === "input" && start.port.input !== obj)
        {
          console.log(obj.left + ", " + obj.top)
          obj.parent.on("moving", (e)=>{ line.set({ x2: obj.left + HEAD_SIZE/2,
                                                    y2: obj.top + HEAD_SIZE/2})});
          line.setCoords();
          //outputObj records output port object
          line.set({hoverCursor: "default", end_id: obj.parent.id, opacity: 1});
          canvas.sendToBack(line);

          //Add connection to both input and output
          start.set({outputs: [...start.outputs, line]})
          obj.parent.set({inputs: [...obj.parent.inputs, line]})

          found = true;
        }
      }

      });
    if (!found)
    {
      canvas.remove(line);
    }
    canvas.remove(head);
    canvas.off("mouse:move", drawing)
    canvas.off("mouse:up", restore)

    isDrawing = false;
    //canvas.off("mouse:up", this);
    canvas.selection = true;
  }

}

export function redrawLine(canvas, line){
  //Get output -> input
  line.set({selectable: false, hoverCursor: "default"});
  for (let obj of canvas.getObjects())
  {
    //Redraw connection start point
    if (obj.id === line.start_id)
    {
      line.set({  x2: obj.port.output.left + HEAD_SIZE/2,
                  y2: obj.port.output.top + HEAD_SIZE/2});
      obj.on("moving", (e)=>{ line.set({  x2: obj.port.output.left + HEAD_SIZE/2,
                                          y2: obj.port.output.top + HEAD_SIZE/2})});
      obj.set({outputs: [...obj.outputs, line]});
    }
    //Redraw conenction end point
    else if (obj.id === line.end_id)
    {
      line.set({  x1: obj.port.input.left + HEAD_SIZE/2,
                  y1: obj.port.input.top + HEAD_SIZE/2});
      obj.on("moving", (e)=>{ line.set({  x1: obj.port.input.left + HEAD_SIZE/2,
                                          y1: obj.port.input.top + HEAD_SIZE/2})});
      obj.set({inputs: [...obj.inputs, line]});

    }
    line.setCoords();
  }
}
