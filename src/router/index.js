const router={
  routes:[
    {
      path: '*',
      redirect:'/404'
    },
    {
      path: '/404',
      component: resolve => require(['../pages/404.vue'], resolve)
    },
    {
      path:'/login-in',
      name:'login-in',
      component: resolve => require(['../pages/LoginIn.vue'], resolve)
    },
    {
      path: '/song-list-album/:id',
      name: 'song-list-album',
      component: resolve => require(['../pages/SongListAlbum.vue'], resolve)
    },
    {
      path: '/lyric/:id',
      name: 'lyric',
      component: resolve => require(['../pages/Lyric.vue'], resolve)
    },
    {
      path: '/song-list',
      name: 'song-list',
      component: resolve => require(['../pages/SongList.vue'], resolve)
    },
    {
      path: '/my-music',
      name: 'my-music',
      component: resolve => require(['../pages/MyMusic.vue'], resolve)
    },
    {
      path:'/sign-up',
      name:'sign-up',
      component: resolve => require(['../pages/SignUp.vue'], resolve)
    },
    {
      // path:'/',
      name:'home',
      // component:()=>import('../pages/Home.vue')
      path: '/',
      component: resolve => require(['../pages/Home.vue'], resolve),
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['../pages/Search.vue'], resolve),
    },
    {
      path: '/singer',
      name: 'singer',

      component: resolve => require(['../pages/Singer.vue'], resolve),
    },
    {
      path: '/singer-album/:id',
      name:'singer-album',
      component: resolve => require(['../pages/SingerAlbum.vue'], resolve),
    },
    {
      path: '/setting',
      name: 'setting',
      component: resolve => require(['../pages/Setting.vue'], resolve),
    }
  ],
  scrollBehavior(to,from,savedPosition){
    return{x:0,y:0}
  }
}
export default router
