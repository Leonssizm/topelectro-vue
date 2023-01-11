<template>
  <div>
    <div class="ml-16">
      <div class="ml-6 flex">
        <div class="mt-8 flex text-xl">
          <h1>Products</h1>
        </div>
      </div>
      <!-- Table -->
      <div class="mt-6 box-border overflow-auto">
        <div class="flex flex-col">
          <div class="overflow-x-auto">
            <div class="flex justify-between py-3 pl-2">
              <div class="relative max-w-xs">
                <label for="hs-table-search" class="sr-only"> Search </label>
                <input
                  type="text"
                  name="search"
                  class="block w-full rounded-md border-gray-200 p-3 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                  placeholder="Search..."
                />
                <div
                  class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <div class="flex text-sm">
                <button
                  class="rounded bg-blue-500 py-2 px-3 font-bold text-white hover:bg-blue-700"
                >
                  Add Product
                </button>
              </div>
            </div>

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
                    v-for="product in products"
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
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                      >
                        {{ product.sq }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                      >
                        {{ product.name }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                      >
                        {{ product.price }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                      >
                        {{ product.wholesale_price }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                      >
                        {{ product.picture }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                      >
                        {{ product.categoryName }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium"
                      >
                        <button
                          type="button"
                          class="text-gray-500 hover:text-gray-700"
                          @click="view"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </button>
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium"
                      >
                        <button
                          type="button"
                          class="text-green-500 hover:text-green-700"
                          @click="category"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </button>
                      </td>

                      <td
                        class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium"
                      >
                        <button
                          type="button"
                          class="text-red-500 hover:text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { isProxy, toRaw } from "vue";
export default {
  data() {
    return {
      products: [],
      categories: [],
      pivotData: [],
      categoryNames: [],
    };
  },
  mounted() {
    fetch("http://127.0.0.1:8000/api/products")
      .then((response) => response.json())
      .then((products) => {
        this.products = products;
      })
      .finally(() => {
        this.products.forEach((product) => {
          product.categoryName = [];
          this.categories.push(product.categories);
        });
        this.categories.forEach((category) => {
          category.forEach((item) => {
            this.pivotData.push([item.pivot, item.name]);
          });
        });
        this.pivotData.forEach((data) => {
          this.products.forEach((product) => {
            if (data[0].product_id == product.id) {
              product.categoryName.push(data[1]);
            }
          });
        });
      });
  },
  methods: {},
};
</script>
