import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from "./router"
import { store,key } from "./store"
import { createPinia } from "pinia"
const app = createApp(App)
const pinia = createPinia()
// 全局引入element-icon
import * as ElIcons from "@element-plus/icons"
import * as ElementUI from "element-plus"
for (const iconNameKey in ElIcons) {
  app.component(iconNameKey,(ElIcons as any)[iconNameKey]) //实际就是key,obj[key]
}

// 全局引入i18n
import i18n from "@/i18n"

// 全局指令-按钮控制权限
// 使用：    <button v-btn="'c'">权限按钮-goodinfo</button>  注意里面也是字符串格式，双引号包含单引号
app.directive("btn", {
  mounted(el, binding ) {
    if (!store.state.buttonStore.buttonList.includes(binding.value)) {
        el.parentNode.removeChild(el)
    }
  }
})



// 全局
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $Alert: (a:string)=>Promise<void>,
    $Confirm: (a:string)=>Promise<void>,
    $Notify: any
  }
}

app.config.globalProperties.$Alert = ElementUI.ElMessageBox.alert
app.config.globalProperties.$Confirm = ElementUI.ElMessageBox.confirm
app.config.globalProperties.$Notify = ElementUI.ElNotification

app.use(router)
app.use(store,key)
app.use(i18n)
app.use(pinia)
app.mount('#app')

// createApp(App).use(router).mount('#app')
