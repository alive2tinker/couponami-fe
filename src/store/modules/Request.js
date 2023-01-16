import axios from "axios";
import store from "../index";
import router from "../../router";
import { Preferences } from "@capacitor/preferences";
// import { Preferences } from "@capacitor/preferences";
// import * as AxiosLogger from 'axios-logger';

const generateRequest = async() => {

}

expo

// export default () => {
//   let token = '';
//   const getToken = async() => {
//     const { value } = await Preferences.get({key: 'user'});
//     return value;
//   }

//   token = getToken().then((result) => {
//     return result;
//   });

//   console.log(`here is token after capacitor${token}`)
  
//   let rHeaders = {
//     Authorization: `Bearer ${token}`,
//     Accept: "application/json",
//   };
  
//   const request = axios.create({
//     baseURL:
//       process.env.NODE_ENV === "production"
//         ? process.env.VUE_APP_PRODUCTION_URL
//         : process.env.VUE_APP_TESTING_URL,
//     headers: rHeaders,
//   });

//   request.interceptors.request.use((request) => {
//     console.log("Starting Request", JSON.stringify(request, null, 2));
//     return request;
//   });

//   request.interceptors.response.use((response) => {
//     console.log("Response:", JSON.stringify(response, null, 2));
//     return response;
//   });

//   request.interceptors.response.use(
//     function (response) {
//       // Any status code that lie within the range of 2xx cause this function to trigger
//       // Do something with response data
//       return response;
//     },
//     function (error) {
//       if (error.response.status === 401) {
//         store.dispatch("auth/logout");
//         router.push("/login");
//       } else if (error.response.status === 404) {
//         alert(JSON.stringify(error.response));
//       }
//       // Any status codes that falls outside the range of 2xx cause this function to trigger
//       // Do something with response error
//       return Promise.reject(error);
//     }
//   );

//   return request;
// };
