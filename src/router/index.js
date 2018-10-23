import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import Login from '@/components/Login'
import Register from '@/components/Register'
import Calendar from '@/views/Calendar'
import HomeStudent from '@/components/HomeStudent'
import Progress from '@/components/Progress'
import Auth from '@/views/Auth'
import Dashboard from '@/views/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login
    // },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/homestudent',
      name: 'HomeStudent',
      component: HomeStudent
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/progress',
      name: ' Progress',
      component: Progress
    },
    {
      path: '/login',
      name: ' Auth',
      component: Auth
    },
    {
      path: '/dashboard',
      name: ' Dashboard',
      component: Dashboard
    }
  ]
})
