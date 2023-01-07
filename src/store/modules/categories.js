import Request from "./Request";

const CategoriesModule = {
    namespaced: true,

    state: () => ({
        categories: []
    }),

    getters: {
        all(state) {
            return state.categories;
        },
    },

    actions: {
        fetchCategories({ commit }) {
            return new Promise((resolve, reject) => {
                Request().get('categories').then((res) => {
                    commit('SET_CATEGORIES', res.data.data);
                    resolve();
                }).catch((err) => {
                    reject(err)
                })
            })
        }
    },

    mutations: {
        SET_CATEGORIES(state, data) {
            state.categories = data;
        }
    }
}

export default CategoriesModule;