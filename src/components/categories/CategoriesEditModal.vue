<template>
  <div class="visible">
    <div class="flex w-1/4 flex-col rounded border bg-green-100">
      <div class="mb-4 px-2">
        <label class="mb-1 block text-sm">Category Name:</label>
        <input
          class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
          type="text"
          placeholder="Category"
          v-model="categoryName"
        />
      </div>
      <div class="mb-4 px-2">
        <label class="mb-1 block text-sm">Description:</label>
        <textarea
          class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
          type="text"
          placeholder="Description"
          v-model="categoryDescription"
        ></textarea>
      </div>
      <div class="mb-2 flex justify-around">
        <SuccessButton content="Save Changes" @click="sendEditedCategoryInfo" />
        <WarningButton />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios/index.js";
import WarningButton from "@/components/ui/buttons/WarningButton.vue";
import SuccessButton from "@/components/ui/buttons/SuccessButton.vue";
export default {
  components: {
    WarningButton,
    SuccessButton,
  },
  inject: ["name", "description", "id", "visibleModal"],
  data() {
    return {
      categories: [],
      categoryName: this.name,
      categoryDescription: this.description,
      categoryId: this.id,
      modal: this.visibleModal,
    };
  },
  mounted() {
    axios.get("categories").then((categories) => {
      this.categories = categories.data;
    });
  },
  methods: {
    sendEditedCategoryInfo() {
      axios
        .put(`categories/${this.categoryId}`, {
          name: this.categoryName,
          description: this.categoryDescription,
        })
        .then(() => {
          this.modal = false;
        });
    },
  },
};
</script>
