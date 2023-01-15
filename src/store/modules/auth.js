import Request from './Request';
import { Preferences } from '@capacitor/preferences';

const AuthModule = {
  namespaced: true,

  state: () => ({
    user: {
      id: 2,
      name:  'abdulmalik'
    },
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
        console.log(data);
        Request().post('login', data).then((response) => {
          commit('SET_TOKEN', response.data.split('|')[1]);
          const setName = async () => {
            await Preferences.set({
              key: 'token',
              value: response.data.split('|')[1],
            });
          };
          setName().then(() => {
            Request().get('user').then((response) => {
              commit('SET_USER', response.data);
            })
            resolve(response);
          })
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
    SET_TOKEN(state, data){
      state.userToken = data
    }
  }
};

export default AuthModule;
