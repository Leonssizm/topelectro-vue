<template>
  <div class="visible">
    <div class="flex w-1/3 flex-col rounded border bg-green-100">
      <div class="mt-5 flex justify-around">
        <div class="mb-4 px-2">
          <label class="mb-1 block text-sm">Product Name:</label>
          <input
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            type="text"
            placeholder="Name"
            v-model="productName"
          />
        </div>
        <div class="mb-4 px-2">
          <label class="mb-1 block text-sm">SQ:</label>
          <input
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            type="text"
            placeholder="SQ"
            v-model="productSQ"
          />
        </div>
      </div>
      <div class="flex justify-around">
        <div class="mb-4 px-2">
          <label class="mb-1 block text-sm">Price:</label>
          <input
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            type="text"
            placeholder="Price"
            v-model="productPrice"
          />
        </div>
        <div class="mb-4 px-2">
          <label class="mb-1 block text-sm">Wholesale Price:</label>
          <input
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            type="text"
            placeholder="Wholesale Price"
            v-model="productWholesalePrice"
          />
        </div>
      </div>
      <div class="flex justify-around">
        <div class="px-2">
          <div class="flex flex-col items-center">
            <label class="mb-1 block text-sm">Image:</label>
            <input
              type="file"
              class="text-grey-500 text-sm file:mr-5 file:rounded-full file:border-0 file:bg-blue-50 file:py-2 file:px-6 file:text-sm file:font-medium file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
              accept="image"
              @change="pictureDisplayAndStore"
            />
          </div>
        </div>
        <div class="px-2">
          <div class="flex flex-col items-center">
            <label class="mb-1 block text-sm">Color:</label>
            <input
              type="text"
              class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
              placeholder="color"
              v-model="productColor"
            />
          </div>
        </div>
      </div>
      <div id="preview" class="mt-8 flex justify-center">
        <img v-if="imageUrl" :src="imageUrl" />
      </div>
      <!-- Select category -->
      <div>
        <div class="mb-4 flex px-2">
          <div class="mb-3 xl:w-96">
            <label>Select Category</label>
            <select
              class="form-select m-0 block w-full appearance-none rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              aria-label="Default select example"
              id="categoriesSelect"
              v-model="selectedCategoryId"
              @change="getChosenCategories"
            >
              <option hidden>Select Category</option>
            </select>
          </div>
        </div>
      </div>
      <div></div>
      <div class="mb-4 px-2">
        <div class="flex flex-col">
          <label class="mb-1 block text-sm">Details:</label>
          <textarea
            type="text"
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            placeholder="specify details"
            v-model="productDetails"
          ></textarea>
        </div>
      </div>
      <div class="mb-2 flex justify-around">
        <button
          class="rounded bg-green-500 py-2 px-3 font-bold text-white hover:bg-green-700"
          type="button"
          @click="addProduct"
        >
          Add Product
        </button>
        <button
          type="button"
          class="rounded bg-red-500 py-2 px-3 font-bold text-white hover:bg-red-700"
          @click="$emit('closeAddModal')"
        >
          Close
        </button>
      </div>
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

let selectedCategories = [];
let selectedCategoryId = ref("");

onMounted(() => {
  axios.get("categories").then((response) => {
    response.data.forEach((category) => {
      document.getElementById("categoriesSelect").innerHTML += `
      <option value=${category.id} id=${category.id}>${category.name}</option>
      `;
    });
  });
});

function getChosenCategories() {
  if (
    selectedCategories.find((id) => id == selectedCategoryId.value) == undefined
  ) {
    selectedCategories.push(selectedCategoryId.value);
  }
}

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
  for (let i = 0; i < selectedCategories.length; i++) {
    formData.append(`category_ids[${i}]`, selectedCategories[i]);
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
