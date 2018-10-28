import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Calendar from '@/views/Calendar'
import HomeStudent from '@/components/HomeStudent'
import Login from '@/views/Login'
import Profile from '@/views/Profile'
import AddStudent from '@/views/AddStudent'
import ScoreBoard from '@/views/ScoreBoard'
import Group from '@/components/Group'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requireAuth: true }
    },
    {
      path: '/addstudent',
      name: 'AddStudent',
      component: AddStudent
    },
    {
      path: '/scoreboard',
      name: 'ScoreBoard',
      component: ScoreBoard
    },
    {
      path: '/group',
      name: 'Group',
      component: Group
    }

  ]
})
