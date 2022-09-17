import { defineStore } from "pinia"
import { UserType } from "./type"
import { login, loginByToken } from "@/api/auth"
import router from "@/router"
import {menuStore} from "./menuStore"
import { buttonStore } from "./buttonStore"

export interface AuthState {
  token: string,
  userInfo: UserType,
  roles:string[]
}
export const authStore = defineStore("auth", {
  state:():AuthState => {
    return {
      token: "",
      userInfo: {
        avatar: '',
        username: '',
        roleName: '',
        status: 1
      },
      roles:[]
    }
  },
  getters: {
    getToken(state: AuthState) {
      return state.token
    }
  },
  actions: {
    // 正常输入用户名+密码登录
    login( requestUser:API.loginForm) {
      login(requestUser).then(res => {
        console.log("登录信息==", res)
        this.userInfo = res.data
        this.roles.push(res.data.roleId)
        this.token = res.data.token

        const useMenuStore = menuStore()
        useMenuStore.generateSystemMenus(res.data.permissions)
        const useButtonStore = buttonStore()
        useButtonStore.generateButtons(res.data.permissions)

        localStorage.setItem("token",res.data.token)
        router.push({path:"/index"})
      })
    },
    // 如果已经登录过，有token则直接模拟登录操作，跳过登录页:有token但是没有用户信息，就直接根据token反向获取用户信息
    // token登录
    loginByToken( token:string) {
      this.token = token
      loginByToken(token).then(result => {
        this.userInfo = result.data
        localStorage.setItem('token', result.data.token)

        const useMenuStore = menuStore()
        useMenuStore.generateSystemMenus(result.data.permissions)
        const useButtonStore = buttonStore()
        useButtonStore.generateButtons(result.data.permissions)

          console.log(result)
          if (result.data.status) {
              router.push({ path: '/index' })
          }
      }).catch(() => {
          localStorage.removeItem('token')
      })
    },
    changePermission(permission:string[]) {
      const useMenuStore = menuStore()
      useMenuStore.generateSystemMenus(permission)
      const useButtonStore = buttonStore()
      useButtonStore.generateButtons(permission)
    }
    // 退出
    // logout({ commit, state, dispatch }) {
    //   state.token = ""
    //   state.userInfo =  {
    //     avatar: '',
    //     username: '',
    //     roleName: '',
    //     status: 1
    //   }
    //   localStorage.removeItem("token")
    // }

  },
})