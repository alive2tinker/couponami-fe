import Request from './Request';
import { Preferences } from '@capacitor/preferences';

const AuthModule = {
  namespaced: true,

  state: () => ({
    user: {},
    userToken: ''
  }),

  getters: {
    token(state){
      return state.userToken;
    },
    user(state){
      return state.user;
    }
  },

  actions: {
    login({commit}, data){
      return new Promise((resolve, reject) => {
        Request().post('login', data).then((response) => {
          commit('SET_USER', response.data);
          const setName = async () => {
            await Preferences.set({
              key: 'user',
              value: JSON.stringify(response.data),
            });
          };
          setName()
          resolve(response);
        }).catch((err) => {
          reject(err.response.data.errors);
        })
      })
    }
  },

  mutations: {
    SET_USER(state, data){
      state.user = data;
    },
  }
};

export default AuthModule;
