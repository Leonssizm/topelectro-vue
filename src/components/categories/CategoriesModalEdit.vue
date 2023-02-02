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
        <ButtonSuccess content="Save Changes" @click="sendEditedCategoryInfo" />
        <ButtonWarning @click="$emit('closeEditModal')" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios/index.js";
import ButtonWarning from "@/components/ui/buttons/ButtonWarning.vue";
import ButtonSuccess from "@/components/ui/buttons/ButtonSuccess.vue";
export default {
  components: {
    ButtonWarning,
    ButtonSuccess,
  },
  inject: ["name", "description", "id"],
  data() {
    return {
      categories: [],
      categoryName: this.name,
      categoryDescription: this.description,
      categoryId: this.id,
    };
  },
  mounted() {
    axios.get("categories").then((categories) => {
      this.categories = categories.data;
    });
  },
  methods: {
    sendEditedCategoryInfo() {
      // editCategory
      const category = {
        id: this.categoryId,
        name: this.categoryName,
        description: this.categoryDescription,
      };
      axios.put(`categories/${this.categoryId}`, category).then(() => {
        this.$emit("closeEditModal");
        this.$emit("updateCategory", category);
      });
    },
  },
};
</script>
