import {fabric} from 'fabric';

export function drawSquare(canvas)  {
  //At the moment it adds it to the top left corner
  canvas.add(new fabric.Rect({ height: 100, width: 100 }));
}
