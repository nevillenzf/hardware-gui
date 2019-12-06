//Const name
export const UPDATE_CANVAS = "UPDATE_CANVAS";
export const UPDATE_COMP_LIST = "UPDATE_COMP_LIST";
export const REMOVE_COMP = "REMOVE_COMP";
export const CLEAR_COMP = "CLEAR_COMP";
export const SHOW_INFO_WINDOW = "SHOW_INFO_WINDOW";
export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const SET_COUNTER = "SET_COUNTER";
export const UPDATE_PROJECT_NAME = "UPDATE_PROJECT_NAME";

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

export function clearComponents() {
  return {
    type: CLEAR_COMP,
  }
}

export function showInfoWindow(state) {
  return {
    type: SHOW_INFO_WINDOW,
    show: state
  }
}

export function incrementCounter() {
  return {
    type: INCREMENT_COUNTER,
  }
}

export function setCounter(num) {
  return {
    type: SET_COUNTER,
    new_num: num,
  }
}

export function updateProjectName(name) {
  return {
    type: UPDATE_PROJECT_NAME,
    name: name,
  }
}
