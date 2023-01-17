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
  <div v-if="visibleModal" class="visible">
    <div class="flex w-1/4 flex-col rounded border bg-green-100">
      <div class="mb-4 px-2">
        <label class="mb-1 block text-sm">Category Name:</label>
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
        <SuccessButton
          @click="sendEditedCategoryInfo()"
          content="Save Changes"
        />
        <WarningButton @click="closeEditCategoryModal" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios/index.js";
import "@/assets/main.css";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import WarningButton from "@/components/ui/buttons/WarningButton.vue";
import SuccessButton from "@/components/ui/buttons/SuccessButton.vue";
export default {
  components: {
    IconEdit,
    IconDelete,
    WarningButton,
    SuccessButton,
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
    sendEditedCategoryInfo() {
      axios
        .put(`categories/${this.categoryId}`, {
          name: this.categoryName,
          description: this.categoryDescription,
        })
        .then((res) => {
          if (res.status == 204) {
            const category = this.categories.filter(
              (item) => item.id == this.categoryId
            );
            category[0].name = this.categoryName;
            category[0].description = this.categoryDescription;
          }
          this.closeEditCategoryModal();
        });
    },
    closeEditCategoryModal() {
      this.visibleModal = false;
    },
  },
};
</script>
