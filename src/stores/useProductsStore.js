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
    updateProduct(product) {
      console.log(product);
      const index = this.list.findIndex((item) => item.id == product.id);
      this.list[index] = product;
    },
    addProduct(product) {
      this.list.push(product);
    },
  },
  getters: {
    getQuantity() {
      return this.list.length;
    },
    // getProductCategories() {
    //   const categories = [];
    //   const pivotData = [];
    //   this.list.forEach((product) => {
    //     product.categoryNames = [];
    //     categories.push(product.categories);
    //   });
    //   categories.forEach((category) => {
    //     category.forEach((item) => {
    //       pivotData.push([item.pivot, item.name]);
    //     });
    //   });
    //   pivotData.forEach((data) => {
    //     this.list.forEach((product) => {
    //       if (data[0].product_id == product.id) {
    //         product.categoryNames.push(data[1]);
    //       }
    //     });
    //   });
    //   return this.list.categoryNames;
    // },
  },
});
