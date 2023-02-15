import { defineStore } from "pinia";
export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    list: [],
  }),
  actions: {
    initCategories(categories) {
      this.list = categories;
    },
  },
});
