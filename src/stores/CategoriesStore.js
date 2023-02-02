import { defineStore } from "pinia";
import axios from "axios";
export const useCategoriesStore = defineStore("categoriesStore", {
  state: () => ({
    categories: [],
  }),

  actions: {
    async getCategories() {
      await axios
        .get("http://127.0.0.1:8000/api/categories")
        .then((categories) => {
          this.categories = categories.data;
        });
      console.log(this.categories);
    },
  },
});
