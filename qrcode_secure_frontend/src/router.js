import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Scan from "./views/Scan.vue";
import Settings from "./views/Settings.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/scan",
      name: "scan",
      component: Scan,
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
  ],
});
