<template>
  <div class="visible">
    <div class="flex w-1/4 flex-col rounded border bg-green-100">
      <v-form>
        <v-container>
          <v-text-field
            type="text"
            placeholder="Category"
            v-model="category.name"
            label="Category Name"
          ></v-text-field>

          <v-text-field
            type="text"
            placeholder="Description"
            v-model="category.description"
            label="Description"
          ></v-text-field>
        </v-container>
        <v-card-actions class="flex justify-between pt-0">
          <v-btn @click="createNewCategory" variant="flat" color="primary">
            Add Category</v-btn
          >
          <v-btn variant="flat" color="error" @click="$emit('closeAddModal')">
            Close
          </v-btn>
        </v-card-actions>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import axios from "@/plugins/axios/index.js";
import { useCategoriesStore } from "@/stores/useCategoriesStore";
import { reactive } from "vue";
const emit = defineEmits(["closeAddModal"]);

const categoriesStore = useCategoriesStore();

const category = reactive({
  name: "",
  description: "",
});

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
