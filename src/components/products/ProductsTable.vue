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
              {{ getCategoriesAsString(product.categoryNames) }}
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
</template>
<script setup>
import axios from "@/plugins/axios/index.js";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconDetails from "@/components/icons/IconDetails.vue";
import { useProductsStore } from "@/stores/useProductsStore";

const productsStore = useProductsStore();

function deleteProduct(id) {
  axios.delete(`products/${id}`).then(() => {
    productsStore.deleteProduct(id);
  });
}

function getCategoriesAsString(categoryArr) {
  return [...categoryArr].join(" ");
}
</script>
