import axios from 'axios';
import store from '../index';
import router from '../../router'
import { Preferences } from '@capacitor/preferences';

export default () => {
    let rHeaders = {};
    let token = '';
    try{
        //eslint-disable-next-line no-unused-vars
        const getToken = async () => {
            const { value } = await Preferences.get({ key: 'token' });

           token = value;
            console.log(`token before sent ${token}`)
        };
        getToken()
        console.log(`token before sent after method call ${token}`)
        rHeaders = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        };
    }catch(e){
        //
    }
    const request = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PRODUCTION_URL : process.env.VUE_APP_TESTING_URL,
        headers: rHeaders
    });

    request.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        if (error.response.status === 401) {
            store.dispatch('auth/logout');
            router.push('/login')
        } else if (error.response.status === 404) {
            alert(JSON.stringify(error.response))
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });


    return request;

}