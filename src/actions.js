//Const name
export const UPDATE_CANVAS = "UPDATE_CANVAS";
export const UPDATE_COMP_LIST = "UPDATE_COMP_LIST";
export const REMOVE_COMP = "REMOVE_COMP";

//Action creators
export function updateCanvas(canvas) {
  return {
    type: UPDATE_CANVAS,
    canvas: canvas,
  }
}

export function updateComponents(comp,id) {
  return {
    type: UPDATE_COMP_LIST,
    comp: comp,
    id: id
  }
}

export function removeComponents(comp,id) {
  return {
    type: REMOVE_COMP,
    comp: comp,
    id: id
  }
}
