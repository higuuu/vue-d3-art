import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import JapanIncomeData from "@/views/JapanIncomeData.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/japan-income/data",
    name: "JapanIncomeData",
    component: JapanIncomeData
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
