<template>
  <div class="ml-2">
    <ResourceHeader header="Categories" />
    <div class="flex-col">
      <div class="mt-3 border-indigo-500 py-3 pl-5 hover:border-l-4">
        <p>Total of {{ store.getQuantity }} Categories</p>
      </div>
      <div class="flex justify-between py-3 pl-2">
        <SearchInput />
        <div class="flex text-sm">
          <ButtonPrimary @click="showAddModal = true" content="Add Category" />
        </div>
      </div>
    </div>
    <CategoriesTable
      @openEditCategoryModal="openEditCategoryModal"
      @deleteCategory="deleteCategory"
    />
  </div>

  <CategoriesModalAdd
    @closeAddModal="showAddModal = false"
    v-if="showAddModal"
  />

  <CategoriesModalEdit
    @closeEditModal="showEditModal = false"
    @updateCategory="handleUpdateCategory"
    v-if="showEditModal"
  />
</template>

<script setup>
import axios from "@/plugins/axios/index.js";
import "@/assets/main.css";
import SearchInput from "@/components/ui/inputs/SearchInput.vue";
import CategoriesTable from "@/components/categories/CategoriesTable.vue";
import CategoriesModalEdit from "@/components/categories/CategoriesModalEdit.vue";
import CategoriesModalAdd from "@/components/categories/CategoriesModalAdd.vue";
import ResourceHeader from "@/components/shared/ResourceHeader.vue";
import { computed, ref, provide, onMounted } from "vue";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary.vue";
import { useCategoriesStore } from "@/stores/useCategoriesStore";

const store = useCategoriesStore();
let categoryDescription = ref("");
let categoryName = ref("");
let categoryId = ref("");
let showAddModal = ref(false);
let showEditModal = ref(false);

provide(
  "name",
  computed(() => categoryName)
);
provide(
  "description",
  computed(() => categoryDescription)
);
provide(
  "id",
  computed(() => categoryId)
);

function deleteCategory(id) {
  axios.delete(`categories/${id}`).then(() => {
    store.deleteCategory(id);
  });
}
function openEditCategoryModal(id) {
  categoryId.value = id;
  const category = store.list.filter((item) => item.id == id);
  categoryName.value = category[0].name;
  categoryDescription.value = category[0].description;
  showEditModal.value = true;
}
function handleUpdateCategory(category) {
  // const index = this.store.list.findIndex((item) => item.id == category.id);
  // this.this.store.list[index] = category;
  store.updateCategory(category);
}
onMounted(() => {
  axios.get("categories").then((response) => {
    const categories = response.data;
    store.setCategories(categories);
  });
});
</script>
