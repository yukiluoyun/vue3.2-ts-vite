import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from "./router"
import { store } from "./store"





const app = createApp(App)
// 全局引入element-icon
import * as ElIcons from "@element-plus/icons"
for (const iconNameKey in ElIcons) {
  app.component(iconNameKey,(ElIcons as any)[iconNameKey]) //实际就是key,obj[key]
}

app.use(router)
app.use(store)
app.mount('#app')

// createApp(App).use(router).mount('#app')
