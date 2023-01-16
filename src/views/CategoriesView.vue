<template>
  <div class="ml-2">
    <ResourceHeader header="Categories" />
    <div class="flex-col">
      <div class="flex justify-between py-3 pl-2">
        <SearchInput />
        <div class="flex text-sm">
          <PrimaryButton @click="openAddCategory()" content="Add Category" />
        </div>
      </div>
    </div>

    <!-- Table -->
    <CategoriesTable :key="componentKey" />
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
        <SuccessButton @click="createNewCategory" content="Add" />
        <WarningButton @click="closeAddCategoryModal()" />
      </div>
    </div>
  </div>
</template>

<script>
// TODO: global Use setup scripts and composition api\
import axios from "@/plugins/axios/index.js";
import SearchInput from "../components/ui/inputs/SearchInput.vue";
import CategoriesTable from "../components/categories/CategoriesTable.vue";
import ResourceHeader from "../components/shared/ResourceHeader.vue";
import WarningButton from "../components/ui/buttons/WarningButton.vue";
import SuccessButton from "../components/ui/buttons/SuccessButton.vue";
import PrimaryButton from "../components/ui/buttons/PrimaryButton.vue";

export default {
  components: {
    CategoriesTable,
    ResourceHeader,
    SearchInput,
    WarningButton,
    SuccessButton,
    PrimaryButton,
  },
  data() {
    return {
      componentKey: 0,
      categories: [],
      categoryDescription: "",
      categoryName: "",
      categoryId: "",
      newCategoryDescription: "",
      newCategoryName: "",
    };
  },
  methods: {
    // new category
    openAddCategory() {
      document.getElementById("addCategoryModal").classList.remove("invisible");
      document.getElementById("addCategoryModal").classList.add("visible");
    },
    createNewCategory() {
      axios
        .post("categories", {
          name: this.newCategoryName,
          description: this.newCategoryDescription,
        })
        .then((res) => {
          if (res.status == 201) {
            this.closeAddCategoryModal();
            this.forceRerender();
          } else {
            alert(["something went wrong, try again", "error:" + res.status]);
          }
        });
    },
    closeAddCategoryModal() {
      document.getElementById("addCategoryModal").classList.remove("visible");
      document.getElementById("addCategoryModal").classList.add("invisible");
    },
    forceRerender() {
      this.componentKey += 1;
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
