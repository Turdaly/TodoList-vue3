import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/index.vue"),
    },
    {
      path: "/:CatchAll(.*)",
      name: "404",
      component: () => import("../pages/notFound.vue")
    }
  ],
});

export default router;
