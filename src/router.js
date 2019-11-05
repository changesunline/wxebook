import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/store'
    },
    {
      path: '/ebook',
      component: () => import('./views/ebook/index.vue'),
      children: [
        {
          path: ':fileName',
          component: () => import('./components/ebook/EbookReader.vue')
        }
      ]
    },
    {
      path: '/store',
      component: () => import('./views/store/index.vue'),
      redirect: '/store/home',
      children: [
        {
          path: 'home',
          component: () => import('./views/store/StoreHome.vue')
        }
      ]
    },
    // {
    //   path: '/store/home',
    //   component: () => import('./views/store/StoreHome.vue')
    // }
  ]
})
