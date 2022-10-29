
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ToDo.vue') },
      { path: '/help', component: () => import('pages/HelpPage.vue') },
      { path: '/login', component: () => import('src/pages/LoginHere.vue') },
      { path: '/register', component: () => import('src/pages/RegisterHere.vue') },
    ]},{
    path: '/auth',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      
      { path: 'login', component: () => import('src/pages/LoginHere.vue') },
      { path: 'register', component: () => import('src/pages/RegisterHere.vue') },
    ],

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
