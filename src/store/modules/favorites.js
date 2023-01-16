
// import Request from "./Request";
import {getRequest} from './Request'
const FavoritesModule = {
    namespaced: true,

    state: () => ({
        favorites: []
    }),

    getters: {
        all(state) {
            return state.favorites;
        }
    },

    actions: {
        fetchFavorites({ commit }, user) {
            return new Promise((resolve, reject) => {
                Request().get(`user/${user}/favorites`).then((res) => {
                    commit('SET_FAVORITES', res.data.data);
                    resolve();
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        //eslint-disable-next-line no-unused-vars
        registerFavorite({commit}, data){
            return new Promise((resolve, reject) => {
                Request().post(`favoriteCoupon/${data.userID}/${data.couponID}`).then((response) => {
                    resolve(response);
                }).catch((err) => {
                    reject(err);
                })
            })
        }
    },

    mutations: {
        SET_FAVORITES(state, data) {
            state.favorites = data;
        }
    }
}

export default FavoritesModule;