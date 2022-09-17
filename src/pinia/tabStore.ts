import { defineStore } from "pinia"
import router from "@/router"
import { Itab } from "./type"

export interface TabState {
  tabList: Array<Itab>,
  currentPath:String
}
export const tabStore = defineStore("tabs", {
  state: ():TabState => {
    return {
      tabList: [],
      currentPath:''
    }
  },
  getters: {
    getAddTab(state:TabState) {
      return  state.tabList
    }
  },
  actions: {
    // 点击左侧菜单，添加顶部tab
    addTab(tab: Itab) {
      const hasTab = this.tabList.some((item) => {
        return item.path === tab.path
      })
      if (!hasTab) { //如果暂时没有这个tab，则添加上来
        this.tabList.push(tab)
      }
    },
    // 关闭删除tab
    closeTab( tabPath: string) {
      const index = this.tabList.findIndex(item => item.path === tabPath)
      this.tabList.splice(index,1)
    },
    // 保存右键点击的id,也就是path，供关闭其他、左右tab用
    saveCurrentPath( path: string) {
      this.currentPath = path
    },
    // 鼠标右键关闭所有
    closeTabAll() {
      this.tabList = []
      sessionStorage.removeItem("TABS_ROUTES")
    },
      // 鼠标右键关闭左、右、其他,flag判断左、右、其他
    closeTabOther(flag: string) {
      const index = this.tabList.findIndex(item => item.path === this.currentPath)
      if (flag === "left") {
        this.tabList.splice(0,index) //splice会改变原始数据，不会返回什么东西，所以不用定义一个新的数组来接收
      } else if (flag === "right") {
        this.tabList.splice(index+1)
      } else if (flag === "other") {
        this.tabList = this.tabList.filter(item =>item.path === this.currentPath) //filter得到一个新的数组，不会改变原来的数组
      }
        
      }
  },
})