//Const name
export const UPDATE_CANVAS = "UPDATE_CANVAS";
export const UPDATE_COMP_LIST = "UPDATE_COMP_LIST";
export const REMOVE_COMP = "REMOVE_COMP";
export const SHOW_INFO_WINDOW = "SHOW_INFO_WINDOW";

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

export function showInfoWindow(state) {
  return {
    type: SHOW_INFO_WINDOW,
    show: state
  }
}
