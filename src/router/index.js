import { createRouter, createWebHistory } from "vue-router";
import checkToken from "@/services/checkToken";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Main/Index.vue"),
      children: [
        {
          path: "",
          name: "index",
          component: () => import("@/components/Main/Index.vue"),
        },
        {
          path: "auth",
          name: "auth",
          component: () => import("@/components/Login.vue"),
        },
        {
          path: "register",
          component: () => import("@/components/Register.vue"),
        },
      ],
    },
    {
      path: "/dashboard",
      component: () => import("@/views/Dashboard/Index.vue"),
      children: [
        {
          path: "",
          name: "dash",
          component: () => import("@/components/Dashboard/Index.vue"),
        },
        {
          path: "/account/profile/:name",
          name: "profile",
          component: () => import("@/components/Dashboard/Account/Profile.vue"),
        },
      ],
      meta: {
        middlewareAuth: true,
      },
    },
  ],
});

router.beforeEach(() => {
  document.title = `${process.env.VUE_APP_NAME}`
});
router.beforeResolve((to) => {
  if (to.meta.middlewareAuth) {
    if (!checkToken()) return { name: "index" };
    return true;
  }

  if (checkToken()) return { name: "dash" };
});
export default router;
