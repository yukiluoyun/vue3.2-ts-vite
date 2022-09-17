import { defineStore } from "pinia"


export interface ButtonState{
  buttonList:string[]
}
export const buttonStore = defineStore("button", {
  state: ():ButtonState => {
    return {
      buttonList:[]
    }
  },
  getters: {
    getButtons:state=>state.buttonList
  },
  actions: {
    // buttons :用户登录后获取的权限数组
    generateButtons(buttons: string[]) {
      let list: string[] = []
      buttons.forEach(button => {
        // 如果有三个：，表示是按钮级的权限
        // console.log('button.match(/:/g)======',button.match(/:/g))
        if (button.match(/:/g)?.length === 3) {
          list.push(button)
        }
      })
      this.buttonList = list
    }
  }
})