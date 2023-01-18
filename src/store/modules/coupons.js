import Request from './Request';
import store from '..';
const CouponsModule = {
    namespaced: true,

    state: () => ({
        coupons: [],
        searchedCoupons: []
    }),

    getters: {
        all(state) {
            return state.coupons;
        },
        searched(state){
            return state.searchedCoupons;
        }
    },

    actions: {
        fetchCoupons({ commit }) {
            return new Promise((resolve, reject) => {
                Request().get(`${store.state.auth.language}/coupons`, { params: { include: 'favorites' } }).then((res) => {
                    commit('SET_COUPONS', res.data.data);
                    resolve();
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        searchCoupons({commit}, keyword){
            return new Promise((resolve, reject) => {
                Request().post('coupons/search', {
                    search: {
                        value: keyword
                    }
                }).then((res) => {
                    console.log(res.data.data);
                    commit('SET_SEARCHED_COUPONS', res.data.data);
                    resolve();
                }).catch((err) => {
                    reject(err);
                })
            })
        }
    },

    mutations: {
        SET_COUPONS(state, data) {
            state.coupons = data;
        },
        SET_SEARCHED_COUPONS(state, data){
            state.searchedCoupons = data;
        }
    }
}

export default CouponsModule;