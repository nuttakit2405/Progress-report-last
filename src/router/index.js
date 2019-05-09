import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store'

const Home = () => import('@/views/Home')
const Calendar = () => import('@/views/Calendar')
const Login = () => import('@/views/Login')
const Profile = () => import('@/views/Profile')
const AddProject = () => import('@/views/AddProject')
const ScoreBoard = () => import('@/views/ScoreBoard')
const Folder = () => import('@/views/Folder')
const DocFinal = () => import('@/views/DocFinal')
const UnAuth = () => import('@/views/UnAuth')
const Conference = () => import('@/views/ConferenceGroup')
const Chat = () => import('@/views/Chat')
const ReportProgress = () => import('@/views/ReportProgress')

// admin only
const ImportStudent = () => import('@/views/admin/ImportStudent')
const ImportTeacher = () => import('@/views/admin/ImportTeacher')

Vue.use(Router)

const router = new Router({
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
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requireAuth: true }
    },
    {
      path: '/addproject',
      name: 'AddProject',
      component: AddProject,
      meta: { requireAuth: true }
    },
    {
      path: '/editproject/:projectId',
      name: 'EditProject',
      component: AddProject,
      props: true,
      meta: { requireAuth: true }
    },
    {
      path: '/scoreboard/:projectId',
      name: 'ProjectScoreBoard',
      component: ScoreBoard,
      props: true,
      meta: { requireAuth: true }
    },
    {
      path: '/admin/importstudent',
      name: 'ImportStudent',
      component: ImportStudent,
      meta: { requireAuth: true }
    },
    {
      path: '/admin/importteacher',
      name: 'ImportTeacher',
      component: ImportTeacher,
      meta: { requireAuth: true }
    },
    {
      path: '/folder/:projectId',
      name: 'ProjectFolder',
      component: Folder,
      props: true,
      meta: { requireAuth: true }
    },
    {
      path: '/docfinal/:projectId',
      name: 'Docfinal',
      component: DocFinal,
      props: true,
      meta: { requireAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/unauth',
      name: 'UnAuth',
      component: UnAuth
    },
    {
      path: '/conference/:projectId',
      name: 'Conference',
      component: Conference,
      props: true
      // meta: { requireAuth: true }
    },
    {
      path: '/chat/:projectId',
      name: 'Chat',
      component: Chat,
      props: true
      // meta: { requireAuth: true }
    },
    {
      path: '/reportprogress',
      name: 'ReportProgress',
      component: ReportProgress,
      meta: { requireAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Home') {
    if (from.name == null) {
      next()
    } else if (!store.getters['user/isLogged']) {
      router.replace({ name: 'Login' })
    } else {
      next()
    }
  } else if (to.name === 'Profile' && from.name === 'UnAuth') {
    if (!store.getters['user/isLogged']) {
      router.replace({ name: 'UnAuth' })
    } else {
      next()
    }
  } else if (to.name === 'UnAuth' && from.name === 'Login') {
    router.replace({ name: 'Profile' })
  } else {
    next()
  }
})

export default router
