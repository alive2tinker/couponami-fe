import Request from './Request';
import { Preferences } from '@capacitor/preferences';

const AuthModule = {
  namespaced: true,

  state: () => ({
    user: {},
    userToken: '',
    language: 'ar'
  }),

  getters: {
    user(state){
      return state.user;
    }
  },

  actions: {
    login({commit}, data){
      return new Promise((resolve, reject) => {
        Request().post('api/login', data).then((response) => {
          commit('SET_USER', response.data);
          const setName = async () => {
            await Preferences.set({
              key: 'user',
              value: JSON.stringify(response.data),
            });
          };
          setName().then(() => {
            resolve(response);
          })
          resolve(response);
        }).catch((err) => {
          reject(err);
        })
      })
    },
    registerUser({commit}, data){
      return new Promise((resolve, reject) => {
        Request().post('api/register', data).then((response) => {
          commit('SET_USER', response.data);
          const setName = async () => {
            await Preferences.set({
              key: 'user',
              value: JSON.stringify(response.data),
            });
          };
          setName().then(() => {
            resolve(response);
          })
          resolve(response);
        }).catch((err) => {
          reject(err);
        })
      })
    },
    getCSRF({commit}){
      return new Promise((resolve, reject) => {
        Request().get('sanctum/csrf-cookie').then((response) => {
          console.log(`the response from csrf ${JSON.stringify(response) }`);
          commit('SET_CSRF', response.data);
          resolve(response);
        }).catch((err) => {
          reject(err);
        })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        const userRemoved = async () => {
          await Preferences.remove({ key: "user" });
        };

        userRemoved()
          .then(() => {
            commit("REMOVE_USER");
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    /* eslint-disable-next-line no-unused-vars */
    checkUser({commit}, phoneNumber){
      return new Promise((resolve, reject) => {
        console.log(phoneNumber)
        Request().get(`api/checkUser?phone=${phoneNumber}`).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      })
    },
    /* eslint-disable-next-line no-empty-pattern */
    updatePassowrd({}, data){
      return new Promise((resolve, reject) => {
        Request().post('api/reset-password', data).then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        })
      })
    }
  },

  mutations: {
    SET_USER(state, data){
      state.user = data;
    },
    REMOVE_USER(state){
      state.user = null;
    },
    SET_LANG(state, data){
      state.language = data;
    },
    SET_CSRF(state, data){
      state.csrf = data;
    }
  }
};

export default AuthModule;
