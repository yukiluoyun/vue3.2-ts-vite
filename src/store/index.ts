import { createStore,useStore as baseUseStore,Store } from "vuex"
import { tabStore,TabState } from "./modules/tabs"
import { authStore,AuthState } from "./modules/auth"
import { menuStore,MenuState } from "./modules/menu"
import { buttonStore,ButtonState } from "./modules/buttons"
import { InjectionKey } from "vue"

export interface RootState{
  tabStore:TabState,
  authStore:AuthState,
  menuStore:MenuState,
  buttonStore:ButtonState,
}
export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
  modules: {
    tabStore,
    authStore,
    menuStore,
    buttonStore
  }
})

export function useStore() {
  return baseUseStore(key)
} 