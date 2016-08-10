import React, { Component } from 'react';
import {createStore, combineReducers} from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze';

const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
     default:
       return state;
  }
}

const addCounter = (list) => {
  return [...list, 0]
};

const removeCounter = (list, index) => {
  return [...list.slice(0, index), ...list.slice(index + 1)]
}

const incrementCounter = (list, index) => {
  return [...list.slice(0, index),
          list[index]+1,
          ...list.slice(index+1)];
}

const toggleTodo = (todo)=> {
  return Object.assign({}, todo, {completed: !todo.completed});
  //return {...todo, completed: !todo.completed};
}


// Writing the reducers

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
      case 'TOGGLE_TODO':
        if (state.id !== action.id) {
          return state;
        }
        return Object.assign({}, state, {completed: !state.completed});
      default:
        return state
  }



};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [Object.assign({}, state, todo(undefined, action))];
    case "TOGGLE_TODO":
      return state.map((t) => todo(t, action))
    default:
      return state;
  }

};


const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}



// const todoApp = (state = {}, action) => {
//   return {
//     todo: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   }
// }

const todoApp = combineReducers({
  todos,
  visibilityFilter
})


//
const store = createStore(todoApp);
console.log('Initial State');
console.log(store.getState());
console.log('--------------------');
console.log('Dispatching ADD_TODO');

store.dispatch({type: 'ADD_TODO',
                id: 0,
                text: "Coding...",
                })
console.log(store.getState());

console.log('Dispating another ADD_TODO');

store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: "Shopping"
})

console.log(store.getState());



const testToggleTodo1 = ()=> {
  const todosBefore = [{
    id: 0,
    text: "Learn Redux",
    completed: true
  }, {
    id: 1,
    text: "Go shopping",
    completed: false
  }];

  const todosAfter = [{
    id: 0,
    text: "Learn Redux",
    completed: true
  }, {
    id: 1,
    text: "Go shopping",
    completed: true
  }];

  const action = {
   type: "TOGGLE_TODO",
   id: 1
 }

  expect(todos(todosBefore, action)).toEqual(todosAfter);

};



const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: "ADD_TODO",
    id: 0,
    text: "Learn Redux"
  };

  const stateAfter = [{
    id: 0,
    text: "Learn Redux",
    completed: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);

};


const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  };

  deepFreeze(todoBefore);

  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  };

  expect(toggleTodo(todoBefore)).toEqual(todoAfter);

}

const testAddCounter = () => {

  const listBefore = [];
  const listAfter = [0];
  deepFreeze(listBefore)

  expect(addCounter(listBefore)).toEqual(listAfter);
};

const testRemoveCounter = () => {

  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];
  deepFreeze(listBefore)

  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};


const testIncreaseCounter = () => {

  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];
  deepFreeze(listBefore)

  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
};

// testAddCounter();
// testRemoveCounter();
// testIncreaseCounter();
// testToggleTodo();
// testToggleTodo1();
// testAddTodo();

console.log("All passed!");


const store2 = createStore(counter);


export default class Button extends Component {
  constructor(props){
    super(props);
  }




  render() {
    return (
      <div>
        <button >Increment</button>
        <button>decrement</button>
      </div>
    );
  }
}
