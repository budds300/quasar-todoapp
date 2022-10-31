import { defineStore } from 'pinia';
import auth from './auth'
export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  },
  modules:{
    auth
  }
})
