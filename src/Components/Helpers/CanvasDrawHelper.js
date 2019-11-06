import {fabric} from 'fabric';

export function drawComponent(canvas,name,id) {
  if (name === "Module 1")
  {
    drawSquare(canvas,name,id);
  }
  else if (name === "Module 2")
  {
    drawCircle(canvas,name,id);
  }
  else if (name === "Module 3")
  {
    drawText(canvas,name,id);
  }
  else {
    drawText(canvas,name,id);
  }
}

function drawSquare(canvas,name,id)  {
  //At the moment it adds it to the top left corner
  var rect = new fabric.Rect({ height: 100, width: 100, name:name, id:id});
  //rect.set({"lockScaling" : true});
  console.log(rect);
  canvas.add(rect);
}

function drawCircle(canvas,name,id)  {
  //At the moment it adds it to the top left corner
  var circ = new fabric.Circle({ radius: 100, fill:'red', name:name, id:id});
  console.log(circ);
  canvas.add(circ);
}

function drawText(canvas,name,id)  {
  //At the moment it adds it to the top left corner
  var text = new fabric.Text( name,{name:name, id:id, fontSize: 20, width: 100});
  console.log(text);
  canvas.add(text);
}
