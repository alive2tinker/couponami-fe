import Request from "./Request";

const FavoritesModule = {
    namespaced: true,

    state: () => ({
        favorites: []
    }),

    getters: {
        all(state) {
            return state.favorites;
        },
    },

    actions: {
        fetchFavorites({ commit }) {
            return new Promise((resolve, reject) => {
                Request().get('user/1/favorites').then((res) => {
                    commit('SET_FAVORITES', res.data.data);
                    resolve();
                }).catch((err) => {
                    reject(err)
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