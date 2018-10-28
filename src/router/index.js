import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Calendar from '@/views/Calendar'
import HomeStudent from '@/components/HomeStudent'
import Progress from '@/components/Progress'
import Auth from '@/views/Auth'
import Profile from '@/views/Profile'
import AddStudent from '@/views/AddStudent'
import ScoreBoard from '@/views/ScoreBoard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld
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
      path: '/progress',
      name: 'Progress',
      component: Progress
    },
    {
      path: '/login',
      name: 'Login',
      component: Auth
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
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
    }
  ]
})
