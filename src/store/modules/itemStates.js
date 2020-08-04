import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const state = {
  items: []
};

const getters = {
  allItems: state => state.items
};

const actions = {
  // fetch items from api
  // TODO: replace this url to the real backend
  async fetchItems({commit}) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    commit('setItems', response.data);
  },

  // TODO: replace this url to the real backend
  async addItem({commit}, title) {
    // add item to the frontend with a temporary item
    const tempId = uuidv4();
    commit('addItem', {id: tempId, title, completed: false});
    // update the item with a real id from backend
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {title, completed: false});
    commit('updateTempId', {tempId, newId: response.data.id})

  },

  // TODO: replace this url to the real backend
  async deleteItem({commit}, id) {
    commit('deleteItem', id);
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  },


  // TODO: replace this url to the real backend
  // fetch a limited amount of items
  async filterItems({commit}, event) {
    // get selected number
    const limit = parseInt(event.target.options[event.target.options.selectedIndex].innerText);
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
    commit('setItems', response.data);
  },

  async updateItem({commit}, itemToUpdate) {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${itemToUpdate.id}`, itemToUpdate);
    commit('updateItem', response.data)
  }
};

const mutations = {
  setItems: (state, items) => {
    state.items = items;
  },
  addItem: (state, newItem) => state.items.unshift(newItem),
  deleteItem: (state, id) => state.items = state.items.filter(item => item.id !== id),
  updateItem: (state, newItem) => {
    const index = state.items.findIndex(item => item.id === newItem.id);
    if (index !== -1) {
      state.items.splice(index, 1, newItem);
    }
  },
  updateTempId: (state, {tempId, newId}) => {
    state.items.map(item => {
      if (item.id === tempId) {
        item.id = newId;
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
