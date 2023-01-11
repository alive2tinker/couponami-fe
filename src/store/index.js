import { createStore } from 'vuex'
import CategoriesModule from './modules/categories'
import CouponsModule from './modules/coupons'
import FavoritesModule from './modules/favorites'
import AuthModule from './modules/auth'

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
    categories: CategoriesModule,
    favorites: FavoritesModule,
    auth: AuthModule
  }
})
