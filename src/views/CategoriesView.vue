<template>
  <div class="ml-36">
    <div class="ml-6 flex">
      <div class="mt-8 flex text-xl">
        <h1>Categories</h1>
      </div>
    </div>
    <!-- Table -->
    <div class="mt-6">
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
                Add Category
              </button>
            </div>
          </div>

          <div class="inline-block w-full p-1.5 align-middle">
            <div class="overflow-hidden rounded-lg border">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3 pl-4">
                      <div class="flex h-5 items-center">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          class="rounded border-gray-200 text-blue-600 focus:ring-blue-500"
                        />
                        <label for="checkbox" class="sr-only"> Checkbox </label>
                      </div>
                    </th>
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
                      Category Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500"
                    >
                      Description
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
                  class="divide-y divide-gray-200"
                  v-for="category in categories"
                  :id="category.id"
                  :key="category.id"
                >
                  <tr>
                    <td class="py-3 pl-4">
                      <div class="flex h-5 items-center">
                        <input
                          type="checkbox"
                          class="rounded border-gray-200 text-blue-600 focus:ring-blue-500"
                        />
                        <label for="checkbox" class="sr-only"> Checkbox </label>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800"
                    >
                      {{ category.id }}
                    </td>
                    <td
                      class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                    >
                      {{ category.name }}
                    </td>
                    <td
                      class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                    >
                      {{ category.description }}
                    </td>
                    <td
                      class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                    >
                      <button
                        type="button"
                        class="text-green-500 hover:text-green-700"
                        @click="editCategory(category.id)"
                      >
                        Edit
                      </button>
                    </td>
                    <td
                      class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                    >
                      <button
                        type="button"
                        class="text-red-500 hover:text-red-700"
                        @click="deleteCategory(category.id)"
                      >
                        Delete
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
  <!-- Edit form popup -->
  <div class="invisible" id="editCategoryModal">
    <div class="flex w-1/4 flex-col rounded border bg-green-100">
      <div class="mb-4 px-2">
        <label class="blocktext-sm mb-1">Category Name:</label>
        <input
          class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
          type="text"
          autofocus
          placeholder="Category"
          v-model="categoryName"
        />
      </div>
      <div class="mb-4 px-2">
        <label class="mb-1 block text-sm">Description:</label>
        <textarea
          class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
          type="text"
          autofocus
          placeholder="Description"
          v-model="categoryDescription"
        ></textarea>
      </div>
      <div class="mb-2 flex justify-around">
        <button
          class="rounded bg-green-500 py-2 px-3 font-bold text-white hover:bg-green-700"
          type="button"
          @click="sendEditedCategoryInfo()"
        >
          Add
        </button>
        <button
          type="button"
          class="rounded bg-red-500 py-2 px-3 font-bold text-white hover:bg-red-700"
          @click="closeAddCategoryModal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "title", "body"],
  data() {
    return {
      categories: [],
      categoryDescription: "",
      categoryName: "",
      categoryId: "",
    };
  },
  mounted() {
    fetch("http://127.0.0.1:8000/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        this.categories = categories;
      });
  },
  methods: {
    deleteCategory(id) {
      fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.status == 204) {
          document.getElementById(`${id}`).remove();
        }
      });
    },
    editCategory(id) {
      this.categoryId = document
        .getElementById(id)
        .children.item(0)
        .children.item(1).innerHTML;

      this.categoryName = document
        .getElementById(id)
        .children.item(0)
        .children.item(2).innerHTML;

      this.categoryDescription = document
        .getElementById(id)
        .children.item(0)
        .children.item(3).innerHTML;

      document
        .getElementById("editCategoryModal")
        .classList.remove("invisible");
      document.getElementById("editCategoryModal").classList.add("visible");
    },
    sendEditedCategoryInfo() {
      const data = {
        name: this.categoryName,
        description: this.categoryDescription,
      };
      fetch(
        `http://127.0.0.1:8000/api/categories/${this.categoryId}?_method=PUT`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      ).then((res) => {
        if (res.status == 204) {
          document
            .getElementById(this.categoryId)
            .children.item(0)
            .children.item(2).innerHTML = data.name;
          document
            .getElementById(this.categoryId)
            .children.item(0)
            .children.item(3).innerHTML = data.description;
        }
      });
    },
    closeAddCategoryModal() {
      document.getElementById("editCategoryModal").classList.remove("visible");
      document.getElementById("editCategoryModal").classList.add("invisible");
    },
  },
  provide() {
    return {
      categories: this.categories,
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
