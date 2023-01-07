import Request from './Request';

const CouponsModule = {
    namespaced: true,

    state: () => ({
        coupons: []
    }),

    getters: {
        all(state) {
            return state.coupons;
        },
    },

    actions: {
        fetchCoupons({ commit }) {
            return new Promise((resolve, reject) => {
                Request().get('coupons', { params: { include: 'favorites' } }).then((res) => {
                    commit('SET_COUPONS', res.data.data);
                    resolve();
                }).catch((err) => {
                    reject(err)
                })
            })
        }
    },

    mutations: {
        SET_COUPONS(state, data) {
            state.coupons = data;
        }
    }
}

export default CouponsModule;