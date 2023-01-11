import { createRouter, createWebHistory } from "@ionic/vue-router";
import TabsPage from "../views/Tabs/TabsPage.vue";
import { Preferences } from '@capacitor/preferences';
// import store from '../store';


const routes = [
  {
    path: "/",
    redirect: "/tabs/",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Auth/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "registration",
    component: () => import("@/views/Auth/RegisterPage.vue"),
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: () => import("@/views/Auth/ForgotPasswordPage.vue"),
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/home",
      },
      {
        path: "home",
        name: "home",
        component: () => import("@/views/Tabs/HomePage.vue"),
        meta:{
          isGuarded: false
        }
      },
      {
        path: "favorites",
        name: "favorites",
        component: () => import("@/views/Tabs/FavoritePage.vue"),
        meta:{
          isGuarded: true
        }
      },
      {
        path: "createCoupon",
        name: "createCoupon",
        component: () => import("@/views/Tabs/CreateCouponPage.vue"),
        meta:{
          isGuarded: true
        }
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("@/views/Tabs/SettingsPage.vue"),
        meta:{
          isGuarded: false
        }
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  /* eslint-disable-next-line no-unused-vars */
  const user = await Preferences.get({key:'user'});
  if(to.meta.isGuarded && user.token === null){
    next({name: 'Login'})
  }else{
    next();
  }
})

export default router;
