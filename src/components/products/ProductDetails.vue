<template>
  <h1 class="mb-5 ml-16 mt-8 flex flex-col text-xl">
    Product Details: SQ{{ productSQ }}
  </h1>
  <v-card class="mx-auto mt-8 flex flex-col text-xl" max-width="400">
    <v-img
      class="align-end text-white"
      height="400"
      width="400"
      :src="productImage"
      cover
    >
      <v-card-title> {{ productName }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4"> SQ: {{ productSQ }} </v-card-subtitle>

    <v-card-text>
      <div>Price: {{ productPrice }}</div>
      <div>Wholesale Price {{ productWholesalePrice }}</div>
      <v-divider :thickness="20"></v-divider>
      <div>Categories: {{ productCategories }}</div>
    </v-card-text>

    <v-card-actions>
      <v-row class="flex justify-around">
        <v-btn color="green"> Edit Product </v-btn>
        <v-btn color="red"> Delete </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
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
