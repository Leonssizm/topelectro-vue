import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import ProductsView from "@/views/ProductsView.vue";
import UsersView from "@/views/UsersView.vue";
import CommentsView from "@/views/CommentsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/categories",
      name: "categories",
      component: CategoriesView,
    },
    {
      path: "/products",
      name: "products",
      component: ProductsView,
    },
    {
      path: "/users",
      name: "users",
      component: UsersView,
    },
    {
      path: "/comments",
      name: "comments",
      component: CommentsView,
    },
  ],
});

export default router;
