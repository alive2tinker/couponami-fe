
// import Request from "./Request";
import Request from './Request'
import store from '..';
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
                Request().get(`api/${store.state.auth.language}/user/${user}/favorites`).then((res) => {
                    commit('SET_FAVORITES', res.data);
                    resolve();
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        //eslint-disable-next-line no-unused-vars
        registerFavorite({commit}, data){
            console.log(`before sending data ${data}`)
            return new Promise((resolve, reject) => {
                Request().post(`api/favoriteCoupon/${data.userID}/${data.couponID}`).then((response) => {
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