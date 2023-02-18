import { defineStore } from "pinia";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    list: [],
  }),
  actions: {
    setCategories(categories) {
      this.list = categories;
    },

    addCategory(category) {
      this.list.push(category);
    },
    updateCategory(category) {
      const index = this.list.findIndex((item) => item.id == category.id);
      this.list[index] = category;
    },
    deleteCategory(id) {
      // COMING SOON
    },
  },
  getters: {
    getQuantity() {
      // COMING SOON
    },
  },
});
