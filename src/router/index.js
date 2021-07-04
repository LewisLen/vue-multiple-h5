import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
const Task = import("../views/Task.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/task",
    name: "Task",
    component: Task,
    meta: {
      title: "任务",
      keepAlive: false, // 是否需要缓存
      auth: false, // 用户权限
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
