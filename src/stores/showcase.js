import { sign } from 'core-js/core/number';
import { defineStore } from 'pinia';
import auth from 'src/apis/auth';
export const useCounterStore = defineStore('counter', {
  namespaced:true,
  state: () => ({
   form : {
    name:null,
    email:null,
    password:null,
    token:null
    }
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
   async register ( ) {
      auth.register().then(response)
    }, 
    async signIn(_,credentials){
      let res=await auth.signup(credentials)
      console.log(res.data)
    }
  },
  mutations:{

  }
})
