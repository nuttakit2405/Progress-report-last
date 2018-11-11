import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Calendar from '@/views/Calendar'
import Login from '@/views/Login'
import Profile from '@/views/Profile'
import AddProject from '@/views/AddProject'
import ScoreBoard from '@/views/ScoreBoard'
import ScalWork from '@/components/ScalWork'
import Folder from '@/views/Folder'

// admin only
import ImportStudent from '@/views/admin/ImportStudent'

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
      path: '/admin/importstudent',
      name: 'ImportStudent',
      component: ImportStudent
    },
    {
      path: '/scalwork',
      name: 'ScalWork',
      component: ScalWork
    },
    {
      path: '/folder/:projectId',
      name: 'ProjectFolder',
      component: Folder,
      props: true
    }
  ]
})
