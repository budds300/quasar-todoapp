import { defineStore } from "pinia";
import { useQuasar } from "quasar";
import { store } from "quasar/wrappers";
import { useRouter } from "vue-router";
import { api } from "../boot/axios";

const router = useRouter();
const $q = useQuasar();

export const useCounterStore = defineStore("counter", {
  state: () => ({
    id: null,
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
    user: null,
    token: localStorage.getItem("token") || 0,
    tasks: [],
  }),

  getters: {
    getId: (state) => state.id,
    getName: (state) => state.name,
    getEmail: (state) => state.email,
    getToken: (state) => state.token,
    getTask: (state) => state.tasks,
  },

  actions: {
    setToken(payload) {
      const localstore = localStorage.setItem(
        "token",
        payload.data.access_token
      );
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
      console.log("clicked");
      try {
        await api.post("auth/login", { email: email, password: password });
      } catch (error) {
        if (error) throw error;
      }
    },
    async fetchUser() {
      try {
        return await api.get("/user");
      } catch (error) {
        if (error) throw error;
      }
    },
    async registerUser(name, email, password, password_confirmation) {
      try {
       await api.post("auth/register", {name:name,email:email,password:password,password_confirmation:password_confirmation});

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
        await api.post("auth/logout");
      } catch (error) {
        if (error) throw error;
      }
    },
    setUser(payload) {
      if (payload.data.id) this.id = payload.data.id;
      if (payload.data.email) this.email = payload.data.email;
      console.log(payload.data);
    },
    setTask(payload) {
      if (payload.data.reminder) this.reminder = payload.data.reminder;
      console.log(payload.data);

    },

    clearUser() {
      this.name = null;
      this.email = null;
    },
    async fetchTasks() {
      const currentTasks = await api.get("tasks").then((res) => res.data.data);
      this.tasks = currentTasks;
    },
    async addTask(task) {
      this.tasks = [task, ...this.tasks];
      await api.post("tasks", task);
    },
    async deleteTask(id) {
      await api.delete(`tasks/${id}`);
    },

    async toggleReminder(id) {
      const task = this.tasks.find((t) => t.id === id);
      if(task.reminder ===0){
        task.reminder=1
      }
      else if (task.reminder===1){
        task.reminder=0
      }
      console.log(task.reminder)

      // console.log("" + task.reminder)
      const res = await api.patch(`tasks/${id}`, {text: task.text,day:task.day,reminder:task.reminder});
      console.log(res.data.data)
      if (res.error) {
        console.log(res.error);
      }
    },
  },
  persist: true,
});
