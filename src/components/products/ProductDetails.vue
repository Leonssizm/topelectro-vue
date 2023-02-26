<template>
  <div class="ml-16 mt-8 flex flex-col text-xl">
    <div>
      <h1>Product Details: SQ{{ productSQ }}</h1>
    </div>
    <!-- PRODUCT -->
    <div class="container mx-auto bg-slate-100">
      <div class="flex justify-around">
        <div class="flex flex-col">
          <label>ID</label>
          <label>SQ</label>
          <label>Name</label>
          <label>Price</label>
          <label>Wholesale Price</label>
        </div>
        <div>
          <p>{{ productId }}</p>
          <p>{{ productSQ }}</p>
          <p>{{ productName }}</p>
          <p>{{ productPrice }}</p>
          <p>{{ productWholesalePrice }}</p>
          <!-- <img :src="productImage" /> -->
        </div>
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
// let productImage = ref("");
axios.get("products/" + routerIdParams.id).then((response) => {
  let servedProduct = response.data;
  productSQ.value = servedProduct.sq;
  productId.value = servedProduct.id;
  productName.value = servedProduct.name;
  productPrice.value = servedProduct.price;
  productWholesalePrice.value = servedProduct.wholesale_price;
  // productImage.value =
  //   "http://127.0.0.1:8000" + "/images/" + servedProduct.picture;
  // console.log(productImage);
});
</script>
