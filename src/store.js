import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
       status: ''
    },
    getters: {
         status: (state) => {
             return state.status;
         }
    },
    mutations: {
      setStatus(state, payload) {
          state.status = payload;
      }
    }
})