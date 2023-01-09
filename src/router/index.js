import { createRouter, createWebHistory } from "@ionic/vue-router";
import TabsPage from "../views/Tabs/TabsPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/tabs/",
  },
  {
    path: "/login",
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
        component: () => import("@/views/Tabs/HomePage.vue"),
      },
      {
        path: "favorites",
        component: () => import("@/views/Tabs/FavoritePage.vue"),
      },
      {
        path: "createCoupon",
        component: () => import("@/views/Tabs/CreateCouponPage.vue"),
      },
      {
        path: "settings",
        component: () => import("@/views/Tabs/SettingsPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
