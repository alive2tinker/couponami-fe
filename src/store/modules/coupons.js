import Request from './Request';
import store from '..';
const CouponsModule = {
    namespaced: true,

    state: () => ({
        coupons: [],
        searchedCoupons: [],
        userCoupons: []
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
                Request().get(`api/${store.state.auth.language}/coupons`, { params: { include: 'favorites' } }).then((res) => {
                    commit('SET_COUPONS', res.data);
                    resolve();
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        searchCoupons({commit}, keyword){
            return new Promise((resolve, reject) => {
                Request().post(`api/${store.state.auth.language}/coupons/search`, {
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
        },
        createCoupon({commit}, data){
            return new Promise((resolve, reject) => {
                Request().post('api/createCoupon', data).then((response) => {
                    commit('UPDATE_USER_COUPONS', response.data);
                    resolve();
                }).catch((err) => {
                    reject(err);
                })
            })
        },
        fetchNextPage({commit, getters}){
            return new Promise((resolve, reject) => {
                if (getters.all.links.next === null)
                    resolve();
                    
                Request().get(getters.all.links.next ?? '').then((res) => {
                    commit('UPDATE_COUPONS', res.data);
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
        },
        UPDATE_COUPONS(state, data){
            state.coupons.data.push(data.data);
            state.coupons.links = data.links;
        }
    }
}

export default CouponsModule;