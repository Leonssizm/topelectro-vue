<template>
  <div class="visible">
    <div class="flex w-1/3 flex-col rounded border bg-gray-100">
      <Form @submit="addProduct">
        <v-row justify="center">
          <v-card>
            <v-card-title>
              <span class="text-h5">Add product</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <Field
                      name="name"
                      label="სახელი"
                      v-model="productName"
                      as="v-text-field"
                      hide-details
                      rules="required|min:3"
                    >
                      <v-field-label>Product Name</v-field-label>
                    </Field>
                    <ErrorMessage name="name" class="text-red-500" />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <Field
                      name="sq"
                      label="SQ"
                      v-model="productSQ"
                      as="v-text-field"
                      hide-details
                      rules="required|alpha_dash"
                    >
                      <v-field-label>Product SQ</v-field-label>
                    </Field>
                    <ErrorMessage name="sq" class="text-red-500" />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <Field
                      name="color"
                      label="ფერი"
                      v-model="productColor"
                      as="v-text-field"
                      hide-details
                      rules="required"
                    >
                      <v-field-label>Product Color</v-field-label>
                    </Field>
                    <ErrorMessage name="color" class="text-red-500" />
                  </v-col>
                  <v-col cols="12">
                    <Field
                      name="price"
                      label="ფასი"
                      v-model="productPrice"
                      as="v-text-field"
                      hide-details
                      rules="required|price"
                    >
                      <v-field-label>Product price</v-field-label>
                    </Field>
                    <ErrorMessage name="price" class="text-red-500" />
                  </v-col>
                  <v-col cols="12">
                    <Field
                      name="wholesalePrice"
                      label="საბითუმო ფასი"
                      v-model="productWholesalePrice"
                      as="v-text-field"
                      hide-details
                      rules="required|price"
                    >
                      <v-field-label>Wholesale Price</v-field-label>
                    </Field>
                    <ErrorMessage name="wholesalePrice" class="text-red-500" />
                  </v-col>
                  <v-col cols="12">
                    <Field
                      name="categories"
                      label="Categories"
                      placeholder="Categories"
                      as="v-select"
                      :items="selectItems"
                      item-title="state"
                      item-value="id"
                      return-object
                      multiple
                      hide-details
                      v-model="selectedCategories"
                      rules="required"
                    >
                    </Field>
                    <ErrorMessage name="categories" class="text-red-500" />
                  </v-col>
                  <v-col cols="12">
                    <Field
                      as="v-text-field"
                      name="details"
                      label="details"
                      v-model="productDetails"
                      rules="required"
                      hide-details
                    >
                      <v-field-label>Details</v-field-label>
                    </Field>
                    <ErrorMessage name="details" class="text-red-500" />
                  </v-col>
                  <v-col cols="12">
                    <label>ატვირთე ფოტო</label>
                    <Field
                      name="fileInput"
                      as="v-file-input"
                      label="file Input"
                      variant="filled"
                      prepend-icon="mdi-camera"
                      @change="pictureDisplayAndStore"
                      show-size
                      counter
                      rules="ext:jpg,png,svg"
                      hide-details
                    >
                    </Field>
                    <ErrorMessage name="fileInput" class="text-red-500" />
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
              <button>
                <v-btn color="blue-darken-1" variant="text">
                  Add Product
                </v-btn>
              </button>
              <v-btn color="red" variant="text" @click="$emit('closeAddModal')">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from "@/stores/useProductsStore";
import { ref, onMounted } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { setLocale } from "@vee-validate/i18n";
import axios from "@/plugins/axios/index.js";
const emit = defineEmits(["closeAddModal"]);
setLocale("ka");

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
