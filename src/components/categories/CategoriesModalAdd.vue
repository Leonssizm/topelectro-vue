<template>
  <div class="visible">
    <div class="flex w-1/4 flex-col rounded border bg-green-100">
      <div class="mb-4 px-2">
        <label class="mb-1 block text-sm">Category Name:</label>
        <input
          class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
          type="text"
          autofocus
          placeholder="Category"
          v-model="category.name"
        />
      </div>

      <div class="mb-4 px-2">
        <label class="mb-1 block text-sm">Description:</label>
        <textarea
          class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
          type="text"
          autofocus
          placeholder="Description"
          v-model="category.description"
        ></textarea>
      </div>

      <h1>{{ category.description }}</h1>

      <div class="mb-2 flex justify-around">
        <ButtonSuccess @click="createNewCategory" content="Add" />
        <ButtonWarning @click="$emit('closeAddModal')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonWarning from "@/components/ui/buttons/ButtonWarning.vue";
import ButtonSuccess from "@/components/ui/buttons/ButtonSuccess.vue";
import axios from "@/plugins/axios/index.js";
import { useCategoriesStore } from "@/stores/useCategoriesStore";

const emit = defineEmits(["closeAddModal"]);

const categoriesStore = useCategoriesStore();

const category = {
  name: "",
  description: "",
};

function createNewCategory() {
  axios
    .post("categories", category)
    .then((response) => {
      console.log(category);
      categoriesStore.addCategory(response.data);
    })
    .catch(() => {
      console.log("ERROR");
    });

  emit("closeAddModal");
}
</script>
