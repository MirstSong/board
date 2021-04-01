import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  }
]

const router = new VueRouter({
  routes
})

export default router
