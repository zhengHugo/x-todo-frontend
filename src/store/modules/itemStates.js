import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const state = {
  todos: []
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
  // fetch todos from api
  // TODO: replace this url to the real backend
  async fetchTodos({commit}) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
    commit('setTodos', response.data);
  },

  // TODO: replace this url to the real backend
  async addTodo({commit}, title) {
    // add item to the frontend with a temporary item
    const tempId = uuidv4();
    commit('addTodo', {id: tempId, title, completed: false});
    // update the item with a real id from backend
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {title, completed: false});
    commit('updateTempId', {tempId, newId: response.data.id})

  },

  // TODO: replace this url to the real backend
  async deleteTodo({commit}, id) {
    commit('deleteTodo', id);
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
};

const mutations = {
  setTodos: (state, todos) => {
    state.todos = todos;
  },
  addTodo: (state, newTodo) => state.todos.unshift(newTodo),
  deleteTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
  updateTempId: (state, {tempId, newId}) => {
    state.todos.map(todo => {
      if (todo.id === tempId) {
        console.log('before ' + todo.id);
        todo.id = newId;
        console.log('after ' + todo.id);
      }
    });
  }
};


export default {
  state,
  getters,
  actions,
  mutations
};
