import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import { store } from "@/store"
import { loginByToken } from "@/api/auth"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { authStore } from '@/pinia/authStroe';
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
  const useAuthStore = authStore()
  NProgress.start()
  if(!useAuthStore.token && !token) {
      if(to.path.startsWith('/login'))
      next()
      else {
        next('/login')
      }
  } else if(!useAuthStore.token && token) {
    loginByToken(token).then(res => {
      console.log("loginByToken==", res)
      if (res.data.status) {

      //  store.commit('authStore/addUserInfo',res.data)
      //  store.dispatch('menuStore/generateSystemMenus',res.data.permissions)
      //  store.dispatch('buttonStore/generateButtons',res.data.permissions)
        useAuthStore.userInfo = res.data
        useAuthStore.token = res.data.token
      useAuthStore.changePermission(res.data.permissions)
        
        //去掉warning提醒 route 没有match ，原因是动态路由一开始是没有的，所以找不到to对应的路由，
        // if(to.matched.length == 0) {
        //   router.push(to.path) 
        // }
        // 但是这样会造成两次API调用，原因是刷新时单纯的不带参的next()，会先执行next(),然后再跑一遍router.beforeEach等整个流程
        // 解决方案是如下设置，设置{...to}，直接一步到位
        next({...to,replace:true}) //确保动态路由被添加
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