<template>
  <div class="ml-2">
    <ResourceHeader header="Categories" />

    <!-- TODO (not now): calke gaitane mere -->
    <div class="flex-col">
      <div class="flex justify-between py-3 pl-2">
        <SearchInput />
        <div class="flex text-sm">
          <ButtonPrimary
            @click="this.showAddModal = true"
            content="Add Category"
          />
        </div>
      </div>
    </div>

    <CategoriesTable
      @openEditCategoryModal="openEditCategoryModal"
      @deleteCategory="deleteCategory"
    />
  </div>

  <CategoriesModalAdd
    @closeAddModal="this.showAddModal = false"
    v-if="showAddModal"
  />

  <CategoriesModalEdit
    @closeEditModal="this.showEditModal = false"
    @updateCategory="handleUpdateCategory"
    v-if="showEditModal"
  />
</template>

<script>
// TODO: global Use setup scripts and composition api\
import axios from "@/plugins/axios/index.js";
import "@/assets/main.css";
import SearchInput from "@/components/ui/inputs/SearchInput.vue";
import CategoriesTable from "@/components/categories/CategoriesTable.vue";
import CategoriesModalEdit from "@/components/categories/CategoriesModalEdit.vue";
import CategoriesModalAdd from "@/components/categories/CategoriesModalAdd.vue";
import ResourceHeader from "@/components/shared/ResourceHeader.vue";
import { computed } from "vue";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary.vue";
import { useCategoriesStore } from "@/stores/useCategoriesStore";
import { storeToRefs } from "pinia";

export default {
  components: {
    CategoriesTable,
    ResourceHeader,
    SearchInput,
    CategoriesModalEdit,
    CategoriesModalAdd,
    ButtonPrimary,
  },
  data() {
    return {
      categories: [],
      categoryDescription: "",
      categoryName: "",
      categoryId: "",
      showAddModal: false,
      showEditModal: false,
    };
  },
  provide() {
    return {
      name: computed(() => this.categoryName),
      description: computed(() => this.categoryDescription),
      id: computed(() => this.categoryId),
    };
  },
  methods: {
    closeAddCategoryModal() {
      this.showAddModal = false;
    },
    deleteCategory(id) {
      axios.delete(`categories/${id}`).then(() => {
        this.categories = this.categories.filter(
          (category) => category.id != id
        );
      });
    },
    openEditCategoryModal(id) {
      this.categoryId = id;
      const category = this.store.list.filter((item) => item.id == id);
      this.categoryName = category[0].name;
      this.categoryDescription = category[0].description;
      this.showEditModal = true;
    },
    handleUpdateCategory(category) {
      console.log(category);
      // const index = this.store.list.findIndex((item) => item.id == category.id);
      // this.this.store.list[index] = category;
      this.store.updateCategory(category);
    },
  },
  mounted() {
    axios.get("categories").then((response) => {
      const categories = response.data;
      this.store.setCategories(categories);
    });
  },

  setup() {
    const store = useCategoriesStore();
    const { list } = storeToRefs(store);
    return {
      store,
      list,
    };
  },
};
</script>
