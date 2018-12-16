import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/views/Home')
const Calendar = () => import('@/views/Calendar')
const Login = () => import('@/views/Login')
const Profile = () => import('@/views/Profile')
const AddProject = () => import('@/views/AddProject')
const ScoreBoard = () => import('@/views/ScoreBoard')
const Folder = () => import('@/views/Folder')
const DocFinal = () => import('@/views/DocFinal')

// admin only
const ImportStudent = () => import('@/views/admin/ImportStudent')
const ImportTeacher = () => import('@/views/admin/ImportTeacher')

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
      path: '/calendar/:projectId',
      name: 'CalendarProject',
      component: Calendar,
      meta: { requireAuth: true },
      props: true
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
      path: '/editproject/:projectId',
      name: 'EditProject',
      component: AddProject,
      props: true
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
      path: '/admin/importteacher',
      name: 'ImportTeacher',
      component: ImportTeacher
    },
    {
      path: '/folder/:projectId',
      name: 'ProjectFolder',
      component: Folder,
      props: true
    },
    {
      path: '/docfinal/:projectId',
      name: 'Docfinal',
      component: DocFinal,
      props: true
    }
  ]
})
