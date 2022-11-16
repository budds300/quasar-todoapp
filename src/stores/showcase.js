import { defineStore } from "pinia";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "../boot/axios"



const router = useRouter();
const $q = useQuasar();

export const useCounterStore = defineStore("counter", {
  state: () => ({
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
    user: null,
    token: localStorage.getItem("token") || 0,
    tasks:[]
  }),

  getters: {
    getName: (state) => state.name,
    getEmail: (state) => state.email,
    getToken: (state) => state.token,
    getTask: (state) => state.tasks,
  },

  actions: {
    setToken(payload) {
      const localstore =localStorage.setItem("token", payload.data.access_token);
      this.token = token;
    },
    removeToken() {
      this.token = 0;
      localStorage.removeItem("token");
    },
    async getSanctumCookie() {
      try {
        await api.get("csrf-cookie");
      } catch (error) {
        if (error) throw error;
      }
    },
    async login(email, password) {
      console.log("clicked")
      try {
        await api.post("auth/login", { email: email, password: password })

      } catch (error) {
        if (error) throw error;
      }
    },
    async fetchUser() {
      try {
        return await api.get('/user')
      } catch (error) {
        if (error) throw error
      }
    },
    async registerUser(name, email, password, password_confirmation) {
      try {
        const task = api
          .post("auth/register", {
            name,
            email,
            password,
            password_confirmation,
          })
          .then((res) => console.log(res.message));
        console.log(task);
      } catch (error) {
        if (error) throw error;
      }
    },

    async logout() {
      try {
        await api.post("auth/logout");
        this.clearUser();
      } catch (error) {
        if (error) throw error;
      }
    },
    async logOut() {
      try {
        await api.post("auth/logout").then(res =>{

        })

      } catch (error) {
        if (error) throw error;
      }
    },
    setUser(payload) {
      if (payload.data.email) this.email = payload.data.email;
      console.log( payload.data);
    },


    clearUser() {
      this.name = null;
      this.email = null;
    },
    async fetchTasks(){
       await api.get("tasks").then(data=>data.data).then(r =>(r.data))

      },
      async addTask(text,day,reminder){

        if(!text){
          alert('Kindly fill in some details')
        }
        if(!day){
          alert('Kindly fill in some details')
        }
        const newTask={
          text : text,
          day : day,
          reminder :reminder ===true?1:0,
        }
        console.log(newTask)
       const data =await api.post('tasks',newTask)

       this.tasks=[...this.tasks,data]
       this.text=ref(null)
       this.day=ref(null)
       this.reminder=0
      },
  },
  persist: true,
});
