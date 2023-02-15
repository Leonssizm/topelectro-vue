import { defineStore } from "pinia";
export const useProductsStore = defineStore("products", {
  state: () => ({
    list: [],
  }),
  actions: {
    initProducts(products) {
      this.list = products;
    },
  },
});
