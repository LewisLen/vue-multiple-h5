import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// 路由懒加载
const About = () => import("../views/About.vue");
const Login = () => import("../views/Login.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录页面",
      keepAlive: false, // 是否需要缓存
      auth: true, // 用户权限
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "关于我",
      keepAlive: true, // 是否需要缓存
      auth: true, // 用户权限
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
    meta: {
      title: "404",
      keepAlive: true, // 是否需要缓存
      auth: true, // 用户权限
    },
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 }),
});

// 路由拦截-导航守卫
router.beforeEach((to, from, next) => {
  // 登录权限
  if (!to.meta.auth) {
    next({
      path: "/login",
    });
  }
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
