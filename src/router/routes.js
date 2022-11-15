import { createRouter, createWebHashHistory } from "vue-router";
import { useCounterStore } from "src/stores/showcase";

const routes = [
  {
    path: "/",
    beforeEnter: (to, from,next) => {
      const userStore = useCounterStore()
      !userStore.email ?next('/auth/login'):next()
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: ""  ,
        name: "home",
        component: () => import("pages/ToDo.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/help",
        component: () => import("pages/HelpPage.vue"),
        meta: { requiresAuth: true },
      },
      { path: "/login", component: () => import("src/pages/LoginHere.vue") },
      {
        path: "/register",
        component: () => import("src/pages/RegisterHere.vue"),
      },
    ],
  },
  {
    path: "/auth",

    // beforeEnter:(to,from,next)=>{
    //   // let userStore = useCounterStore()
    //   // !userStore.email ? next('/auth/login') : next('/')
    // },
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("src/pages/LoginHere.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "register",
        name: "register",
        component: () => import("src/pages/RegisterHere.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

const router = createRouter({ history: createWebHashHistory(), routes });
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    return { name: "login" };
  }
  if (to.meta.requiresAuth == false && localStorage.getItem("token")) {
    return { name: "home" };
  }
});
export default routes;
