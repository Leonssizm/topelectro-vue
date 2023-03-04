<template>
  <div class="visible">
    <div class="flex w-1/3 flex-col rounded border bg-gray-100">
      <v-row justify="center">
        <v-card>
          <v-card-title>
            <span class="text-h5">Add product</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Name"
                    v-model="productName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Product SQ"
                    v-model="productSQ"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Product Color"
                    v-model="productColor"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Price"
                    v-model="productPrice"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Wholesale Price"
                    v-model="productWholesalePrice"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Categories"
                    :items="selectItems"
                    item-title="state"
                    item-value="id"
                    return-object
                    multiple
                    v-model="selectedCategories"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="details"
                    v-model="productDetails"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    label="File input"
                    variant="filled"
                    prepend-icon="mdi-camera"
                    @change="pictureDisplayAndStore"
                    show-size
                    counter
                  ></v-file-input>
                </v-col>
                <div id="preview" class="flex justify-center">
                  <v-img
                    v-if="imageUrl"
                    :src="imageUrl"
                    :width="130"
                    aspect-ratio="16/9"
                    cover
                  ></v-img>
                </div>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="flex justify-between">
            <v-btn color="blue-darken-1" variant="text" @click="addProduct">
              Add Product
            </v-btn>
            <v-btn color="red" variant="text" @click="$emit('closeAddModal')">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from "@/stores/useProductsStore";
import { ref, onMounted } from "vue";
import axios from "@/plugins/axios/index.js";
const emit = defineEmits(["closeAddModal"]);

const productsStore = useProductsStore();
let productName = ref("");
let productSQ = ref("");
let productPrice = ref("");
let productWholesalePrice = ref("");
let productColor = ref("");
let productDetails = ref("");

let image = ref("");
let imageUrl = ref("");

let selectItems = ref([]);
let selectedCategories = ref([]);
onMounted(() => {
  axios.get("categories").then((response) => {
    response.data.forEach((category) => {
      selectItems.value.push({ state: category.name, id: category.id });
    });
  });
});

function pictureDisplayAndStore(e) {
  const file = e.target.files[0];
  image.value = file;
  imageUrl.value = URL.createObjectURL(file);
}

function addProduct() {
  let formData = new FormData();
  formData.append("name", productName.value);
  formData.append("sq", productSQ.value);
  formData.append("color", productColor.value);
  formData.append("price", productPrice.value);
  formData.append("wholesale_price", productWholesalePrice.value);
  formData.append("details", productDetails.value);
  formData.append("picture", image.value);
  for (let i = 0; i < selectedCategories.value.length; i++) {
    formData.append(`category_ids[${i}]`, selectedCategories.value[i].id);
  }

  axios
    .post(`products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      productsStore.addProduct(response.data);
      emit("closeAddModal");
    });
}
</script>
