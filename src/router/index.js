import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// 路由懒加载
const About = () => import("../views/About.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "关于我",
    },
  },
  {
    path: "/task",
    name: "Task",
    component: (resolve) => require(["../views/Task.vue"], resolve),
    meta: {
      title: "任务",
      keepAlive: false, // 是否需要缓存
      auth: false, // 用户权限
    },
  },
  {
    path: "*",
    name: "Error",
    component: () => import("../views/Error.vue"),
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 }),
});

export default router;
