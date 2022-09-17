import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import { store } from "@/store"
import { loginByToken } from "@/api/auth"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
// declare 的目标是vue-route; 根据报错信息得知是routeMeta报错，所以如下写

NProgress.configure({
  easing: 'ease',
  speed:500,
  showSpinner: false,//是否还显示右侧的进度旋转icon
  
})
declare module 'vue-router' {
  interface RouteMeta {
    title: string,
    icon?: string,
    permission: string,
    index?: number, //渲染顺序用，过渡动画方式用
    keepAlive?:boolean
  }
}
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component:()=> import('@/views/login/Login.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes:routes
})

router.beforeEach((to,from,next)=>{
  const token = localStorage.getItem('token')
  NProgress.start()
  if(!store.state.authStore.token && !token) {
      if(to.path.startsWith('/login'))
      next()
      else {
        next('/login')
      }
  } else if(!store.state.authStore.token && token) {
    loginByToken(token).then(res => {
      console.log("loginByToken==", res)
      if(res.data.status) {
       store.commit('authStore/addUserInfo',res.data)
       store.dispatch('menuStore/generateSystemMenus',res.data.permissions)
       store.dispatch('buttonStore/generateButtons',res.data.permissions)
       if(to.matched.length == 0) {
        
          router.push(to.path)
       }
        next()
      } else{
        next('/login')
      }

    })

  } else {
    next()
  }
})
router.afterEach( route => {
  
  NProgress.done()
})

export default router