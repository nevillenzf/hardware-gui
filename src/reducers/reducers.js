import { combineReducers } from 'redux';
import * as actions from '../actions';

const initCanvas = null;
const initShowInfoWindow = false;
const initName = "my-project-1";

//0 means not signed in, 1 means signed in
function myCompList(state = [], action) {
  //Current Section Action
  if (action.type === actions.UPDATE_COMP_LIST)
  {
    //Update components list
    return [...state, {id:action.id ,comp:action.comp}];
  }
  else if (action.type === actions.REMOVE_COMP)
  {
    //Remove a single component
    return state.filter((item) => item["id"] !== action.id);
  }
  else if (action.type === actions.CLEAR_COMP)
  {
    //return empty list
    return [];
  }

  else return state;
}

function idCounter(state = 0, action) {
  //Increment
  if (action.type === actions.INCREMENT_COUNTER)
  {
    return state + 1;
  }
  //Set to specific number
  else if (action.type === actions.SET_COUNTER)
  {
    return action.new_num;
  }

  else return state;
}

function myCanvas(state = initCanvas, action) {
  //Current Section Action
  if (action.type === actions.UPDATE_CANVAS)
  {
    //Update canvas status
    return action.canvas;
  }
  else return state;
}

function showInfoWindow(state = initShowInfoWindow, action) {
  //Current Section Action
  if (action.type === actions.SHOW_INFO_WINDOW)
  {
    //Update canvas status
    return action.show;
  }
  else return state;
}

function projectName(state = initName, action) {
  //Current Section Action
  if (action.type === actions.UPDATE_PROJECT_NAME)
  {
    //Update canvas status
    return action.name;
  }
  else return state;
}

const reducers = combineReducers({
  myCanvas,
  myCompList,
  showInfoWindow,
  idCounter,
  projectName
})

export default reducers;
