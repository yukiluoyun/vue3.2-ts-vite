import Layout from '@/layout/index.vue'
import {RouteRecordRaw} from 'vue-router'
import i18n from "@/i18n"

const goodsRouter:RouteRecordRaw = 
{
   path: '/good',
   
   name: 'good',
   component:Layout,
   meta: {
     title: 'menus.wGoodsManger',
    //  title: i18n.global.t('menus.wGoodsManger'),
     icon: 'TakeawayBox',
     permission: "system:goods",
   },
  
   children: [
     {
       path: 'category',
       name: 'category',
       component:() => import('@/views/goods/Category.vue'),
       meta: {
        title: 'menus.wGoodsCategory',
         icon: 'ShoppingBag',
         permission: 'system:goods:goodsCategory',
         index:2
       },
       
     },
     {
       path: 'goodQuery',
       name: 'goodQuery',
       component:() => import('@/views/goods/Goods.vue'),
       meta: {
        
         title: 'menus.wGoodsInfo',
         icon: 'SoldOut',
         permission: 'system:goods:goodsInfo',
         index:3
       },
       
     },
   ],
 }

export default goodsRouter