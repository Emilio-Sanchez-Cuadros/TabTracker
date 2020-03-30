import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/Root'
import Register from '../components/Register'
import Login from '../components/Login'
import Songs from '../components/Songs'
import CreateSongs from '../components/CreateSongs'
import Song from '../components/ViewSong/Song'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/root',
      name: 'root',
      component: Root
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/error',
      name: 'error',
      component: Error
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/songs/create',
      name: 'create-songs',
      component: CreateSongs
    },
    {
      path: '/songs/:song_id',
      name: 'song',
      component: Song
    }
    
  ]
})
