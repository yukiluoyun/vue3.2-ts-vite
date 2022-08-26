import router from "@/router"
import { createStore } from "vuex"
import { Itab } from "./type"

interface State {
  tabList: Array<Itab>,
  currentPath:String
}

export const store = createStore<State>({
  state:{
    tabList: [],
    currentPath:''
  },
  mutations: {
    // 点击左侧菜单，添加顶部tab
    addTab(state: State, tab: Itab) {
      const hasTab = state.tabList.some((item) => {
        return item.path === tab.path
      })
      if (!hasTab) { //如果暂时没有这个tab，则添加上来
        state.tabList.push(tab)
      }
    },
    // 关闭删除tab
    closeTab(state: State, tabPath: string) {
      const index = state.tabList.findIndex(item => item.path === tabPath)
      state.tabList.splice(index,1)
    },
    // 保存右键点击的id,也就是path，供关闭其他、左右tab用
    saveCurrentPath(state: State, path: string) {
      state.currentPath = path
    },
    // 鼠标右键关闭所有
    closeTabAll(state: State) {
      console.log("store-closeTabAll")
      state.tabList = []
      sessionStorage.removeItem("TABS_ROUTES")
      router.push({path:"/"})
    },
      // 鼠标右键关闭左、右、其他,flag判断左、右、其他
    closeTabOther(state: State, flag: string) {
      console.log("flag==", flag)
      console.log(" state.currentPath==",  state.currentPath)
      const index = state.tabList.findIndex(item => item.path === state.currentPath)
      if (flag === "left") {
        console.log("进入了left")
        state.tabList.splice(0,index) //splice会改变原始数据，不会返回什么东西，所以不用定义一个新的数组来接收
      } else if (flag === "right") {
        console.log("进入了right")
        state.tabList.splice(index+1)
      } else if (flag === "other") {
        console.log("进入了other")
        state.tabList = state.tabList.filter(item =>item.path === state.currentPath) //filter得到一个新的数组，不会改变原来的数组
      }
        
      }
  },
  getters: {
    getAddTab(state:State) {
      return  state.tabList
    }
  }

})