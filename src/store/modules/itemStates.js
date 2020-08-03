import axios from 'axios';

const state = {
  todos: []
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
  // fetch todos from api
  async fetchTodos({commit}) {
    // TODO: replace this link to the real backend
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    commit('setTodos', response.data);
  },

  async addTodo({commit}, title) {
    // TODO: replace this link to the real backend
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {title, completed: false});
    commit('addTodo', response.data);
  },

  async deleteTodo({commit}, id){
    commit('deleteTodo', id);
    // TODO: replace this link to the real backend
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
};

const mutations = {
  setTodos: (state, todos) => state.todos = todos,
  addTodo: (state, newTodo) => state.todos.unshift(newTodo),
  deleteTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id)
};


export default {
  state,
  getters,
  actions,
  mutations
};
