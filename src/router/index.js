import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListaCani from '../views/ListaCani.vue'
import ListaUsers from '../views/ListaUsers.vue'
import CaniEdit from '../views/CaniEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cani/edit/:id',
      name: 'edit',
      component: CaniEdit
    },
    {
      path: '/listacani',
      name: 'listacani',
      component: ListaCani
    },
    {
      path: '/listausers',
      name: 'listausers',
      component: ListaUsers
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
