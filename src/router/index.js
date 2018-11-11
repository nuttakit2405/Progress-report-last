import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Register from '@/components/Register'
import Calendar from '@/views/Calendar'
import HomeStudent from '@/components/HomeStudent'
import Login from '@/views/Login'
import Profile from '@/views/Profile'
import AddProject from '@/views/AddProject'
import ScoreBoard from '@/views/ScoreBoard'
import ScalWork from '@/components/ScalWork'
import ProgressStudent from '@/components/ProgressStudent'
import ProgressMentor from '@/components/ProgressMentor'
import ProgressTeacher from '@/components/ProgressTeacher'
import Folder from '@/views/Folder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requireAuth: true }
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
      component: Calendar,
      meta: { requireAuth: true }
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
      path: '/addproject',
      name: 'AddProject',
      component: AddProject
    },
    {
      path: '/scoreboard',
      name: 'ScoreBoard',
      component: ScoreBoard
    },
    {
      path: '/scoreboard/:projectId',
      name: 'ProjectScoreBoard',
      component: ScoreBoard,
      props: true
    },
    {
      path: '/scalwork',
      name: 'ScalWork',
      component: ScalWork
    },
    {
      path: '/progressstudent',
      name: 'ProgressStudent',
      component: ProgressStudent
    },
    {
      path: '/progressmentor',
      name: 'ProgressMentor',
      component: ProgressMentor
    },
    {
      path: '/progressteacher',
      name: 'ProgressTeacher',
      component: ProgressTeacher
    },
    {
      path: '/folder',
      name: 'Folder',
      component: Folder
    }
  ]
})
