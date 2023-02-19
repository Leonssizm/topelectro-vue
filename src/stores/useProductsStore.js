import { defineStore } from "pinia";
export const useProductsStore = defineStore("products", {
  state: () => ({
    list: [],
  }),
  actions: {
    setProducts(products) {
      this.list = products;
    },

    deleteProduct(id) {
      this.list = this.list.filter((product) => product.id != id);
    },
  },
  getters: {
    getQuantity() {
      return this.list.length;
    },
  },
});
