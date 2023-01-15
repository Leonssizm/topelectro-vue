<template>
  <div class="ml-2">
    <ResourceHeader header="Categories" />
    <div class="flex-col">
      <div class="flex justify-between py-3 pl-2">
        <SearchInput />
        <div class="flex text-sm">
          <button
            class="rounded bg-blue-500 py-2 px-3 font-bold text-white hover:bg-blue-700"
            @click="openAddCategory()"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <CategoriesTable />
  </div>
  <!-- Edit form popup -->
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
        <button
          class="rounded bg-green-500 py-2 px-3 font-bold text-white hover:bg-green-700"
          type="button"
          @click="sendEditedCategoryInfo()"
        >
          Save Changes
        </button>
        <button
          type="button"
          class="rounded bg-red-500 py-2 px-3 font-bold text-white hover:bg-red-700"
          @click="closeEditCategoryModal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  <!-- Add Category form Popup -->
  <div class="invisible" id="addCategoryModal">
    <div class="flex w-1/4 flex-col rounded border bg-green-100">
      <div class="mb-4 px-2">
        <label class="mb-1 block text-sm">Category Name:</label>
        <input
          class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
          type="text"
          autofocus
          placeholder="Category"
          v-model="newCategoryName"
        />
      </div>
      <div class="mb-4 px-2">
        <label class="mb-1 block text-sm">Description:</label>
        <textarea
          class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
          type="text"
          autofocus
          placeholder="Description"
          v-model="newCategoryDescription"
        ></textarea>
      </div>
      <div class="mb-2 flex justify-around">
        <button
          class="rounded bg-green-500 py-2 px-3 font-bold text-white hover:bg-green-700"
          type="button"
          @click="createNewCategory"
        >
          Add
        </button>
        <button
          type="button"
          class="rounded bg-red-500 py-2 px-3 font-bold text-white hover:bg-red-700"
          @click="closeAddCategoryModal()"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: global Use setup scripts and composition api\

import SearchInput from "../components/ui/SearchInput.vue";
import CategoriesTable from "../components/categories/CategoriesTable.vue";
import ResourceHeader from "../components/shared/ResourceHeader.vue";
export default {
  components: {
    CategoriesTable,
    ResourceHeader,
    SearchInput,
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
        this.closeEditCategoryModal();
      });
    },
    closeEditCategoryModal() {
      document.getElementById("editCategoryModal").classList.remove("visible");
      document.getElementById("editCategoryModal").classList.add("invisible");
    },
    // new category
    openAddCategory() {
      document.getElementById("addCategoryModal").classList.remove("invisible");
      document.getElementById("addCategoryModal").classList.add("visible");
    },
    createNewCategory() {
      fetch("http://127.0.0.1:8000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.newCategoryName,
          description: this.newCategoryDescription,
        }),
      }).then((res) => {
        res.json();
        if (res.status == 201) {
          fetch("http://127.0.0.1:8000/api/categories")
            .then((response) => response.json())
            .then((categories) => {
              this.categories = categories;
            });
          this.closeAddCategoryModal();
        } else {
          alert(["something went wrong, try again", "error:" + res.status]);
        }
      });
    },
    closeAddCategoryModal() {
      document.getElementById("addCategoryModal").classList.remove("visible");
      document.getElementById("addCategoryModal").classList.add("invisible");
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
