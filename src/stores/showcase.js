import { defineStore } from 'pinia';
import api from '../boot/axios'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    
      name: null,
      email: null,
      password: null,
      confirm_password: null,
    user: null
  }),

  getters: {
    getName:((state)=>state.name),
    getEmail:((state)=>state.email)
   
  },

  actions: {
    async getSanctumCookie(){
      try{
        await api.get('sanctum/csrf-cookie')
      }
      catch (error){
        if (error) throw error
      }
    },
    async login(email,password){
      try{
       await api.post('auth/signin',{email,password})}
      catch (error){
        if (error) throw error
      }
      
    },
    async register(name,email,password,confirm_password){
      try{
        api.post('auth/login',{name,email,password,confirm_password})

      }
      catch (error){
        if (error) throw error
      }
    
    },
    async logout(){
      try{
        await api.post('auth/logout')
        this.clearUser()
      }
        catch (error){
          if (error) throw error
        }
    },
    setUser (payload) {
      
      if (payload.first_name) this.firstName = payload.first_name
      if (payload.last_name) this.lastName = payload.last_name
      if (payload.email) this.email = payload.email
    },

    clearUser () {
    
      this.first_name = null
      this.last_name = null
      this.email = null
    }
  },
  persist: true
  
  
})
