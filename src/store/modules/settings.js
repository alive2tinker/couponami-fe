import Request from './Request';

const SettingsModule = {
    namespaced: true,

    state: {
        settings:[]
    },
    getters: {
        all(state) {
            return state.settings;
        }
    },
    mutations: {
        SET_SETTINGS(state,data){
            state.settings = data;
        }
    },
    actions: {
        fetch({commit}){
            return new Promise((resolve, reject) => {
                Request().get('api/settings').then((response) => {
                    commit('SET_SETTINGS', response.data);
                    resolve()
                }).catch((err) => {
                    reject(err);
                })
            })
        }
    },
}

export default SettingsModule;