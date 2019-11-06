import { combineReducers } from 'redux';
import * as actions from '../actions';

const initCanvas = null;

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
    console.log(state)
    return state.filter((item) => item["id"] !== action.id);
  }

  else return state;
}

//0 means not signed in, 1 means signed in
// function myCompDict(state = {}, action) {
//   //Current Section Action
//   if (action.type === actions.UPDATE_COMP_LIST)
//   {
//     //Update components list
//   }
//   else return state;
// }

function myCanvas(state = initCanvas, action) {
  //Current Section Action
  if (action.type === actions.UPDATE_CANVAS)
  {
    //Update canvas status
    return action.canvas;
  }
  else return state;
}


const reducers = combineReducers({
  myCanvas,
  myCompList
})

export default reducers;
