<template>
  <div class="inline-block w-full p-1.5 align-middle">
    <div class="overflow-hidden rounded-lg border">
      <table class="table-fixed divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500"
            >
              ID
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500"
            >
              SQ
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500"
            >
              Name
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500"
            >
              Price
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500"
            >
              Wholesale_price
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500"
            >
              Main image
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500"
            >
              Categories
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-bold uppercase text-gray-500"
            >
              Details
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-bold uppercase text-gray-500"
            >
              Edit
            </th>

            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-bold uppercase text-gray-500"
            >
              Delete
            </th>
          </tr>
        </thead>
        <tbody
          v-for="product in productsStore.list"
          :id="product.id"
          :key="product.id"
          class="divide-y divide-gray-200"
        >
          <tr>
            <td
              class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800"
            >
              {{ product.id }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
              {{ product.sq }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
              {{ product.name }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
              {{ product.price }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
              {{ product.wholesale_price }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
              {{ product.picture }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
              {{ product.categoryNames }}
            </td>
            <td
              class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium"
            >
              <button type="button" class="text-gray-500 hover:text-gray-700">
                <IconDetails />
              </button>
            </td>
            <td
              class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium"
              @click="displayProductValuesInEditModal(product, product.id)"
            >
              <button type="button" class="text-green-500 hover:text-green-700">
                <IconEdit />
              </button>
            </td>

            <td
              class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium"
              @click="deleteProduct(product.id)"
            >
              <button type="button" class="text-red-500 hover:text-red-700">
                <IconDelete />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Edit Product Modal -->
  <div class="visible" v-if="displayEditProductModal">
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
      <div>{{ selectedCategories }}</div>
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
          @click="editProduct"
        >
          Save Changes
        </button>
        <button
          type="button"
          class="rounded bg-red-500 py-2 px-3 font-bold text-white hover:bg-red-700"
          @click="displayEditProductModal = false"
        >
          Close
        </button>
      </div>
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

let selectedCategories = [];
let selectedCategoryId = ref("");

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
      document.getElementById("categoriesSelect").innerHTML += `
      <option value=${category.id} id=${category.id}>${category.name}</option>
      `;
    });
  });
}

function pictureDisplayAndStore(e) {
  const file = e.target.files[0];
  image.value = file;
  imageUrl.value = URL.createObjectURL(file);
}

function getChosenCategories() {
  if (
    selectedCategories.find((id) => id == selectedCategoryId.value) == undefined
  ) {
    selectedCategories.push(selectedCategoryId.value);
  }
}

function editProduct() {
  // Sending request
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

  axios.put(`products/${productId.value}`, formData).then((response) => {
    console.log(response);
    productsStore.updateProduct(response.data);
  });
}
</script>
