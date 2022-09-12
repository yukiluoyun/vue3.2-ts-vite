// 按钮权限
import { Module } from "vuex";
import { RootState } from "../index"

export interface ButtonState{
  buttonList:string[]
}
export const buttonStore: Module<ButtonState, RootState> = {
  namespaced:true,
  state: () => ({
    buttonList:[]
  }),
  mutations: {
    addButton(state:ButtonState,buttons:string[]) {
      state.buttonList = buttons
    }
  },
  getters: {
    getButtons:state=>state.buttonList
  },
  actions: {
    // buttons :用户登录后获取的权限数组
    generateButtons({ commit, state }, buttons: string[]) {
      let list: string[] = []
      buttons.forEach(button => {
        // 如果有三个：，表示是按钮级的权限
        // console.log('button.match(/:/g)======',button.match(/:/g))
        if (button.match(/:/g)?.length === 3) {
          list.push(button)
        }
      })
      commit("addButton",list)
    }
  }
}