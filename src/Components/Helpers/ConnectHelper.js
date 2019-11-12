import {fabric} from 'fabric';
import store from '../../index';

const HEAD_SIZE = 10;
//Exported functio nto draw a component on the canvas, while rendering it in
//the side bar
export function initLine(canvas, start, obj) {
  canvas.setActiveObject(obj)
  var coords = [start.left, start.top, start.left +1, start.top + 1];

  //Line to show where everything is
  var line = new fabric.Line(coords ,{
      fill: 'black',
      stroke: 'black',
      strokeWidth: 5,
      selectable: false,})

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
  canvas.on("mouse:move", (e) => drawLine(canvas, line, head, obj, e.pointer, ))
  canvas.on("mouse:up", () => restoreFunctions(canvas, line, head, obj))

  return line;
}

function drawLine(canvas, line, head, obj, pointer) {

  line.set({x2: pointer.x, y2: pointer.y})
  line.setCoords();
  head.set({left: pointer.x, top: pointer.y})
  head.setCoords();
  canvas.renderAll();
}

function restoreFunctions(canvas, line, head, start)
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

        found = true;
      }
    }

    });
  if (!found)
  {
    canvas.remove(line);
  }
  canvas.remove(head);

  canvas.off("mouse:move");
  canvas.off("mouse:up", this);
  canvas.selection = true;
}
