import { createStore } from 'vuex'
import CategoriesModule from './modules/categories'
import CouponsModule from './modules/coupons'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    coupons: CouponsModule,
    categories: CategoriesModule
  }
})
