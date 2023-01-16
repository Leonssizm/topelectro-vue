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
                        @click="deleteCategory(category.id)"
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
  <div class="invisible" id="editCategoryModal">
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

<script scoped>
import axios from "@/plugins/axios/index.js";
import IconEdit from "../icons/IconEdit.vue";
import IconDelete from "../icons/IconDelete.vue";
import WarningButton from "../ui/buttons/WarningButton.vue";
import SuccessButton from "../ui/buttons/SuccessButton.vue";
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
    };
  },
  mounted() {
    axios.get("categories").then((categories) => {
      this.categories = categories.data;
    });
  },
  methods: {
    deleteCategory(id) {
      axios.delete(`categories/${id}`).then((res) => {
        if (res.status == 204) {
          document.getElementById(id).remove();
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

      axios
        .put(`categories/${this.categoryId}`, {
          name: data.name,
          description: data.description,
        })
        .then((res) => {
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
          this.closeEditCategoryModal();
        });
    },
    closeEditCategoryModal() {
      document.getElementById("editCategoryModal").classList.remove("visible");
      document.getElementById("editCategoryModal").classList.add("invisible");
    },
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
