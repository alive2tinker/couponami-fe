import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import "./assets/css/app.css";

import store from "./store";
import i18n from "./i18n";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Preferences } from "@capacitor/preferences";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlFAzEh7xMxQYYBCJAWVMFNLxD5w_XVHs",
  authDomain: "couponami-12844.firebaseapp.com",
  projectId: "couponami-12844",
  storageBucket: "couponami-12844.appspot.com",
  messagingSenderId: "283845945415",
  appId: "1:283845945415:web:92c8ab6a5aacc3f72ba962",
  measurementId: "G-46CLGFY86D"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);

const app = createApp(App)
  .use(store)
  .use(i18n)
  .use(store)
  .use(IonicVue, {
    mode: "ios",
  })
  .use(router);

  const setLocale = async() => {
    await Preferences.set({
      key:'locale',
      value: 'ar'
    })
  }

  setLocale()

router.isReady().then(() => {
  app.mount("#app");
});
