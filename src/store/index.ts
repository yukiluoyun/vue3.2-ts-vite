import { createStore,useStore as baseUseStore,Store } from "vuex"
import { tabStore,TabState } from "./modules/tabs"
import { authStore,AuthState } from "./modules/auth"
import { InjectionKey } from "vue"

export interface RootState{
  tabStore:TabState,
  authStore:AuthState,
}
export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
  modules: {
    tabStore,
    authStore
  }
})

export function useStore() {
  return baseUseStore(key)
} 