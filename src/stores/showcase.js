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
  }),

  getters: {
    getName: (state) => state.name,
    getEmail: (state) => state.email,
    getToken: (state) => state.token,
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
      try {
        await api.post("auth/login", { email: email, password: password }).then(res =>{
          if(res.status == 200){
            localStorage.setItem("token", res.data.access_token);

          }
        })
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
      console.log(payload.email);
      if (payload.name) this.name = payload.name;
      if (payload.email) this.email = payload.email;
    },

    clearUser() {
      this.name = null;
      this.email = null;
    },
  },
  persist: true,
});
