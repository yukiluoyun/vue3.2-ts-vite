import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from "./router"
import { store,key } from "./store"

const app = createApp(App)
// 全局引入element-icon
import * as ElIcons from "@element-plus/icons"
import * as ElementUI from "element-plus"
for (const iconNameKey in ElIcons) {
  app.component(iconNameKey,(ElIcons as any)[iconNameKey]) //实际就是key,obj[key]
}


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
app.mount('#app')

// createApp(App).use(router).mount('#app')
