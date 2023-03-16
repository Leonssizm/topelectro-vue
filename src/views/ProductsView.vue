<template>
  <div>
    <div class="ml-16">
      <ResourceHeader header="products" />
      <!-- Table -->
      <div class="mt-6 box-border overflow-auto">
        <div class="flex flex-col">
          <div class="overflow-x-auto">
            <div class="mt-3 border-indigo-500 py-3 pl-5 hover:border-l-4">
              <p>Total of {{ store.getQuantity }} Products</p>
            </div>
            <div class="flex justify-between py-3 pl-2">
              <SearchInput />
              <div class="flex text-sm">
                <ButtonPrimary
                  content="Add Product"
                  @click="displayAddModal = true"
                />
              </div>
            </div>
          </div>
          <ProductsTable />
        </div>
      </div>
    </div>
  </div>
  <ProductsAddModal
    @closeAddModal="displayAddModal = false"
    v-if="displayAddModal"
  />
</template>

<script setup>
import ResourceHeader from "../components/shared/ResourceHeader.vue";
import SearchInput from "../components/ui/inputs/SearchInput.vue";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary.vue";
import ProductsTable from "@/components/products/ProductsTable.vue";
import ProductsAddModal from "@/components/products/ProductsModalAdd.vue";
import axios from "@/plugins/axios/index.js";

import { ref, onMounted } from "vue";
import { useProductsStore } from "@/stores/useProductsStore";

const store = useProductsStore();

let displayAddModal = ref(false);

onMounted(() => {
  axios.get("products").then((response) => {
    const products = response.data;
    store.setProducts(products);
  });
});
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
