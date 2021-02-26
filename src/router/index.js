import Vue from 'vue'
import Router from 'vue-router'
import Microblog from '@/components/Microblog'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Feed from '@/components/Feed'
import UserProfile from '@/components/UserProfile'
import TagOverview from '@/components/TagOverview'
import UserSearch from '@/components/UserSearch'
import PostView from '@/components/PostView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '',
      component: Microblog,
      children: [
        {
          path: '/',
          name: 'Feed',
          component: Feed
        },
        {
          path: '/user/:username',
          name: 'UserProfile',
          component: UserProfile
        },
        {
          path: '/tag/:tagname',
          name: 'TagOverview',
          component: TagOverview
        },
        {
          path: '/search/user/:searchname',
          name: 'UserSearch',
          component: UserSearch
        },
        {
          path: '/post/:uuid',
          name: 'PostView',
          component: PostView
        }
      ]
    }
  ]
})
