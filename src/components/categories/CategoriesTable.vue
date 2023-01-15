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
</template>

<script scoped>
import IconEdit from "../icons/IconEdit.vue";
import IconDelete from "../icons/IconDelete.vue";
export default {
  components: {
    IconEdit,
    IconDelete,
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
    fetch("http://127.0.0.1:8000/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        this.categories = categories;
      });
  },
  methods: {
    deleteCategory(id) {
      // TODO: global - Axios
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
