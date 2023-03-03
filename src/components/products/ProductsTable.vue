<template>
  <v-table theme="dark">
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">SQ</th>
        <th class="text-left">Name</th>
        <th class="text-left">Price</th>
        <th class="text-left">Wholesale Price</th>
        <th class="text-left">Image</th>
        <th class="text-left">Categories</th>
        <th class="text-left">Details</th>
        <th class="text-left">Edit</th>
        <th class="text-left">Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in productsStore.list" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.sq }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.wholesale_price }}</td>
        <td>
          <v-img
            :src="'http://127.0.0.1:8000/storage/' + product.picture"
            alt="product image"
          />
        </td>
        <td></td>
        <td>
          <button type="button" class="text-gray-500 hover:text-gray-700">
            <router-link :to="{ name: 'details', params: { id: product.id } }">
              <IconDetails />
            </router-link>
          </button>
        </td>
        <td @click="displayProductValuesInEditModal(product, product.id)">
          <button type="button" class="text-green-500 hover:text-green-700">
            <IconEdit />
          </button>
        </td>
        <td @click="deleteProduct(product.id)">
          <button type="button" class="text-red-500 hover:text-red-700">
            <IconDelete />
          </button>
        </td>
      </tr>
    </tbody>
  </v-table>
  <!-- Edit Product Modal -->
  <div class="visible" v-if="displayEditProductModal">
    <div class="flex w-1/3 flex-col rounded border bg-gray-100">
      <v-row justify="center">
        <v-card>
          <v-card-title>
            <span class="text-h5">Edit product</span>
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
            <v-btn color="blue-darken-1" variant="text" @click="editProduct">
              Save Changes
            </v-btn>
            <v-btn
              color="red"
              variant="text"
              @click="displayEditProductModal = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </div>
  </div>
</template>
<script setup>
import axios from "@/plugins/axios/index.js";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconDetails from "@/components/icons/IconDetails.vue";
import { useProductsStore } from "@/stores/useProductsStore";
import { ref } from "vue";

const productsStore = useProductsStore();

let displayEditProductModal = ref(false);

let productName = ref("");
let productSQ = ref("");
let productPrice = ref("");
let productWholesalePrice = ref("");
let productColor = ref("");
let productDetails = ref("");
let image = ref("");
let imageUrl = ref("");
let productId = ref("");

let selectItems = ref([]);
let selectedCategories = ref([]);

function deleteProduct(id) {
  axios.delete(`products/${id}`).then(() => {
    productsStore.deleteProduct(id);
  });
}

function displayProductValuesInEditModal(product, id) {
  displayEditProductModal.value = true;
  productName.value = product.name;
  productSQ.value = product.sq;
  productPrice.value = product.price;
  productWholesalePrice.value = product.wholesale_price;
  productColor.value = product.color;
  productDetails.value = product.details;
  productId.value = id;
  axios.get("categories").then((response) => {
    response.data.forEach((category) => {
      selectItems.value.push({ state: category.name, id: category.id });
    });
  });
}

function pictureDisplayAndStore(e) {
  const file = e.target.files[0];
  image.value = file;
  imageUrl.value = URL.createObjectURL(file);
}

function editProduct() {
  // Sending request
  let formData = new FormData();

  formData.append("_method", "put");
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
    .post(`products/${productId.value}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      displayEditProductModal.value = false;
      productsStore.updateProduct(response.data);
    });
}
</script>
