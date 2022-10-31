import axios from 'axios'

export default {
  namespaced:true,

  state:{
    user:null
  },
  mutations:{

  },
  actions:{
    async signUp(_,credentials){
      let response = axios.post('auth/signin',credentials)
    }
  }
}
