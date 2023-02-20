<template>
  <div>
    <div class="ml-16">
      <ResourceHeader header="Products" />
      <!-- Table -->
      <div class="mt-6 box-border overflow-auto">
        <div class="flex flex-col">
          <div class="overflow-x-auto">
            <div class="mt-3 border-indigo-500 py-3 pl-5 hover:border-l-4">
              <p>Total of {{ this.store.getQuantity }} Products</p>
            </div>
            <div class="flex justify-between py-3 pl-2">
              <SearchInput />
              <div class="flex text-sm">
                <ButtonPrimary content="Add Product" />
              </div>
            </div>
          </div>
          <ProductsTable />
        </div>
      </div>
    </div>
  </div>
  <!-- Edit product form popup -->
  <div class="invisible" id="editProductModal">
    <div class="flex w-1/3 flex-col rounded border bg-green-100">
      <div class="mt-5 flex justify-around">
        <div class="mb-4 px-2">
          <label class="mb-1 block text-sm">Product Name:</label>
          <input
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            type="text"
            autofocus
            placeholder="Name"
            v-model="productName"
          />
        </div>
        <div class="mb-4 px-2">
          <label class="mb-1 block text-sm">SQ:</label>
          <input
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            type="text"
            autofocus
            placeholder="SQ"
            v-model="sq"
          />
        </div>
      </div>
      <div class="flex justify-around">
        <div class="mb-4 px-2">
          <label class="mb-1 block text-sm">Price:</label>
          <input
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            type="text"
            autofocus
            placeholder="Price"
            v-model="price"
          />
        </div>
        <div class="mb-4 px-2">
          <label class="mb-1 block text-sm">Wholesale Price:</label>
          <input
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            type="text"
            autofocus
            placeholder="Wholesale Price"
            v-model="wholesalePrice"
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
              v-model="color"
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
              id="categorySelection"
              class="form-select m-0 block w-full appearance-none rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              aria-label="Default select example"
              @change="getCategory()"
              v-model="selectedCategory"
            >
              <option hidden>Select Category</option>
            </select>
          </div>
        </div>
        <div class="mb-4 flex">
          <p>{{ this.selectedCategoriesArr }}</p>
        </div>
      </div>

      <div class="mb-4 px-2">
        <div class="flex flex-col">
          <label class="mb-1 block text-sm">Details:</label>
          <textarea
            type="text"
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            placeholder="specify details"
            v-model="details"
          ></textarea>
        </div>
      </div>
      <div class="mb-2 flex justify-around">
        <button
          class="rounded bg-green-500 py-2 px-3 font-bold text-white hover:bg-green-700"
          type="button"
          @click="editProduct()"
        >
          Save Changes
        </button>
        <button
          type="button"
          class="rounded bg-red-500 py-2 px-3 font-bold text-white hover:bg-red-700"
          @click="closeEditProductModal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ResourceHeader from "../components/shared/ResourceHeader.vue";
import SearchInput from "../components/ui/inputs/SearchInput.vue";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary.vue";
import ProductsTable from "@/components/products/ProductsTable.vue";

import axios from "@/plugins/axios/index.js";

import { useProductsStore } from "@/stores/useProductsStore";
import { storeToRefs } from "pinia";

export default {
  components: {
    SearchInput,
    ResourceHeader,
    ButtonPrimary,
    ProductsTable,
  },
  data() {
    return {
      categories: [],
      selectedCategory: "",
      selectedCategoriesArr: [],
      selectedCategoryId: [],
      productId: "",
      productName: "",
      price: "",
      sq: "",
      wholesalePrice: "",
      color: "",
      details: "",
      image: "",
      imageUrl: "",
    };
  },
  mounted() {
    fetch("http://127.0.0.1:8000/api/products")
      .then((response) => response.json())
      .then((products) => {
        this.store.list = products;
      });
    // Get categories for editing Product
    const categorySelectionElement =
      document.getElementById("categorySelection");
    fetch("http://127.0.0.1:8000/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        categories.forEach((category) => {
          categorySelectionElement.innerHTML += `
            <option value=${category.id} id=${category.id}>${category.name}</option>
            `;
        });
      });
  },
  methods: {
    deleteProduct(id) {
      axios.delete(`products/${id}`).then(() => {
        this.store.deleteProduct(id);
      });
    },
    editProduct() {
      // Sending request
      let formData = new FormData();
      formData.append("name", this.productName);
      formData.append("sq", this.sq);
      formData.append("color", this.color);
      formData.append("price", this.price);
      formData.append("wholesale_price", this.wholesalePrice);
      formData.append("details", this.details);
      formData.append("picture", this.image);
      for (let i = 0; i < this.selectedCategoryId.length; i++) {
        formData.append(`category_ids[${i}]`, this.selectedCategoryId[i]);
      }

      axios
        .put(`products/${this.productId}`, formData)
        .then((res) => {
          console.log(res.json());
          console.log(res.status);
        })
        .then((data) => {
          console.log(data);
        });
    },
    openEditProductModal(id) {
      document.getElementById("editProductModal").classList.remove("invisible");
      document.getElementById("editProductModal").classList.add("visible");
      // when opening edit category modal, current values are displayed
      this.productId = document
        .getElementById(id)
        .children.item(0)
        .children.item(0).innerHTML;
      this.sq = document
        .getElementById(id)
        .children.item(0)
        .children.item(1).innerHTML;
      this.productName = document
        .getElementById(id)
        .children.item(0)
        .children.item(2).innerHTML;
      this.price = document
        .getElementById(id)
        .children.item(0)
        .children.item(3).innerHTML;
      this.wholesalePrice = document
        .getElementById(id)
        .children.item(0)
        .children.item(4).innerHTML;
    },
    closeEditProductModal() {
      document.getElementById("editProductModal").classList.remove("visible");
      document.getElementById("editProductModal").classList.add("invisible");
    },

    // additional methods that help functionality
    pictureDisplayAndStore(e) {
      const file = e.target.files[0];
      this.image = file;
      this.imageUrl = URL.createObjectURL(file);
    },
    getCategory() {
      let selectedCategoryId = this.selectedCategory.split(",")[0];

      this.selectedCategoryId.push(selectedCategoryId);
    },
  },
  setup() {
    const store = useProductsStore();
    const { list } = storeToRefs(store);
    return {
      store,
      list,
    };
  },
};
</script>

<style>
.invisible {
  display: none;
}
.visible {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
}
</style>
