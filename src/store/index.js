import Vuex from 'vuex';
import Vue from 'vue';
import itemStates from "@/store/modules/itemStates";

// load vuex
Vue.use(Vuex);

// create store
export default new Vuex.Store({
  modules: {
    itemStates
  }
});
