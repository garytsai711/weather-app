import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
// Weather pages
import WeatherList from "@/pages/Weather/WeatherList.vue";
import WeatherDetail from "@/pages/Weather/WeatherDetail.vue";
// Profile pages (example)
import UserProfile from "@/pages/Profile/UserProfile.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "weather",
        children: [
          {
            path: "",
            name: "weather-list",
            component: WeatherList,
          },
          {
            path: "city/:cityName",
            name: "weather-detail",
            component: WeatherDetail,
            props: true,
          },
        ],
      },
      {
        path: "profile",
        children: [
          {
            path: "",
            name: "user-profile",
            component: UserProfile,
          },
        ],
      },
      // Optional: Redirect root to weather
      {
        path: "",
        redirect: "/weather",
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
