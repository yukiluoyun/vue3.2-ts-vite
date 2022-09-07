import { Module } from "vuex"
import { RootState } from "../index"
import { login, loginByToken } from "@/api/auth"
import router from "@/router"
import {UserType} from "../type"

export interface AuthState {
  token: string,
  userInfo: UserType,
  roles:string[]
}

export const authStore: Module<AuthState, RootState> = {
  namespaced: true,
  state:():AuthState=> ({
    token: "",
    userInfo: {
      avatar: '',
      username: '',
      roleName: '',
      status: 1
    },
    roles:[]
  }),
  mutations: {
    addToken(state:AuthState,token:string) {
      state.token = token
    },
    addUserInfo(state:AuthState,userInfo:UserType) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 正常输入用户名+密码登录
    login({ commit,state,dispatch }, userObj) {
      login(userObj).then(res => {
        console.log("登录信息==", res)
        const {avatar,username,roleName,status}  = res.data
        const user = {
          avatar,
          username,
          roleName,
          status
        }
        commit('addUserInfo',user)
        commit('addToken', res.data.token)
        localStorage.setItem("token",res.data.token)
        router.push({path:"/index"})
      })
    },
    // 如果已经登录过，有token则直接模拟登录操作，跳过登录页:有token但是没有用户信息，就直接根据token反向获取用户信息
    loginByToken({ commit, state, dispatch }, token) {
      commit('addToken', token)
      loginByToken(token).then(res => {
        console.log("根据token 返回登录信息==", res)
        localStorage.setItem("token", token)
        if (res.data.status) {
          const {avatar,username,roleName,status}  = res.data
          const user = {
            avatar,
            username,
            roleName,
            status
          }
          commit('addUserInfo',user)
        }
      }).catch(() => {
        localStorage.removeItem("token")
      })
    },
    logout({ commit, state, dispatch }) {
      state.token = ""
      state.userInfo =  {
        avatar: '',
        username: '',
        roleName: '',
        status: 1
      }
      localStorage.removeItem("token")
    }

  },
  getters: {
    getToken(state: AuthState) {
      return state.token
    }
  }
}