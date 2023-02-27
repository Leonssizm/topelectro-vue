<template>
  <div class="ml-16 mt-8 flex flex-col text-xl">
    <div>
      <h1 class="mb-5">Product Details: SQ{{ productSQ }}</h1>
    </div>
    <!-- PRODUCT -->
    <div class="container mx-auto bg-slate-100">
      <div class="mt-5 flex justify-between">
        <label class="px-5">ID</label>
        <p class="px-5">{{ productId }}</p>
      </div>
      <div class="mt-5 flex justify-between">
        <label class="px-5">SQ</label>
        <p class="px-5">{{ productSQ }}</p>
      </div>
      <div class="mt-5 flex justify-between">
        <label class="px-5">Name</label>
        <p class="px-5">{{ productName }}</p>
      </div>
      <div class="mt-5 flex justify-between">
        <label class="px-5">Price</label>
        <p class="px-5">{{ productPrice }}</p>
      </div>
      <div class="mt-5 flex justify-between">
        <label class="px-5">Wholesale Price</label>
        <p class="px-5">{{ productWholesalePrice }}</p>
      </div>
      <div class="mt-5 flex justify-between">
        <label class="px-5">Picture</label>
        <img
          class="h-58 w-96 object-cover px-5 pl-10 pt-5"
          :src="productImage"
          alt="product-image"
        />
      </div>
      <div class="mt-5 flex justify-between">
        <label class="px-5">Categories</label>
        <p class="px-5">{{ productCategories }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "@/plugins/axios/index.js";
import { useRoute } from "vue-router";
import { ref } from "vue";

const routerIdParams = useRoute().params;

let productSQ = ref("");
let productId = ref("");
let productName = ref("");
let productPrice = ref("");
let productWholesalePrice = ref("");
let productImage = ref("");
let productCategoriesArr = ref([]);
let productCategories = ref("");

axios.get("products/" + routerIdParams.id).then((response) => {
  let servedProduct = response.data;
  productSQ.value = servedProduct.sq;
  productId.value = servedProduct.id;
  productName.value = servedProduct.name;
  productPrice.value = servedProduct.price;
  productWholesalePrice.value = servedProduct.wholesale_price;
  productImage.value =
    "http://127.0.0.1:8000" + "/storage/" + servedProduct.picture;
  servedProduct.categories.forEach((category) => {
    productCategoriesArr.value.push(category.name);
  });
  productCategories.value = productCategoriesArr.value.join(", ");
});
</script>
