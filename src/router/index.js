import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListaCani from '../views/ListaCani.vue'
import ListaUsers from '../views/ListaUsers.vue'
import CaniEdit from '../views/CaniEdit.vue'
import UsersEdit from '../views/UsersEdit.vue'
import LoginView from '../views/LoginView.vue'
import ListaBox from '../views/ListaBox.vue'
import PlanningView from '../components/PlanningView.vue'
import ListaFood from '../views/ListaFood.vue'
import FoodEdit from '../views/FoodEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/cani/edit/:id',
      name: 'edit',
      component: CaniEdit
    },
    {
      path: '/users/edit/:id',
      name: 'useredit',
      component: UsersEdit
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
      path: '/listabox',
      name: 'listabox',
      component: ListaBox
    },
    {
      path: '/planning',
      name: 'planning',
      component: PlanningView
    },
    {
      path: '/food',
      name: 'food',
      component: ListaFood
    },
    {
      path: '/food/edit/:id',
      name: 'foodedit',
      component: FoodEdit
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
