<template>
  <div class="mt-6 box-border overflow-hidden">
    <div>
      <div class="flex flex-col">
        <div class="overflow-x-auto">
          <div class="inline-block w-full p-1.5 align-middle">
            <div class="overflow-hidden rounded-lg border">
              <table class="table-fixed divide-y divide-gray-200">
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
                  v-for="(category, index) in categories"
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
                      class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium"
                    >
                      <button
                        type="button"
                        class="text-green-500 hover:text-green-700"
                        @click="editCategory(category.id)"
                      >
                        <IconEdit />
                      </button>
                    </td>
                    <td
                      class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium"
                    >
                      <button
                        type="button"
                        class="text-red-500 hover:text-red-700"
                        @click="deleteCategory(category.id, index)"
                      >
                        <IconDelete />
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
  <!-- Edit Category Modal -->
  <CategoriesEditModal v-if="visibleModal" />
</template>

<script>
import { computed } from "vue";
import axios from "@/plugins/axios/index.js";
import "@/assets/main.css";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import CategoriesEditModal from "@/components/categories/CategoriesEditModal.vue";
export default {
  components: {
    IconEdit,
    IconDelete,
    CategoriesEditModal,
  },
  data() {
    return {
      categories: [],
      categoryDescription: "",
      categoryName: "",
      categoryId: "",
      newCategoryDescription: "",
      newCategoryName: "",
      visibleModal: false,
    };
  },
  provide() {
    return {
      name: computed(() => this.categoryName),
      description: computed(() => this.categoryDescription),
      id: computed(() => this.categoryId),
      visibleModal: computed(() => this.visibleModal),
    };
  },
  mounted() {
    axios.get("categories").then((categories) => {
      this.categories = categories.data;
    });
  },
  methods: {
    deleteCategory(id, index) {
      axios.delete(`categories/${id}`).then(() => {
        this.categories.splice(index, 1);
      });
    },
    editCategory(id) {
      this.categoryId = id;
      const category = this.categories.filter((item) => item.id == id);
      this.categoryName = category[0].name;
      this.categoryDescription = category[0].description;
      this.visibleModal = true;
    },
    closeEditCategoryModal() {
      this.visibleModal = false;
    },
  },
};
</script>
