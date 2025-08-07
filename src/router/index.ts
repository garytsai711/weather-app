import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import WeatherList from "@/pages/Weather/WeatherList.vue";
import WeatherDetail from "@/pages/Weather/WeatherDetail.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
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
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
