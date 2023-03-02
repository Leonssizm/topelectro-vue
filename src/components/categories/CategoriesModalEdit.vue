<template>
  <div class="visible">
    <div class="flex w-1/4 flex-col rounded border bg-gray-100">
      <v-form>
        <v-container>
          <v-text-field
            type="text"
            placeholder="Category"
            v-model="categoryName"
            label="Category Name"
          ></v-text-field>

          <v-text-field
            type="text"
            placeholder="Description"
            v-model="categoryDescription"
            label="Description"
          ></v-text-field>
        </v-container>
        <v-card-actions class="flex justify-between pt-0">
          <v-btn @click="sendEditedCategoryInfo" variant="flat" color="primary">
            Save Changes</v-btn
          >
          <v-btn variant="flat" color="error" @click="$emit('closeEditModal')">
            Close
          </v-btn>
        </v-card-actions>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import axios from "@/plugins/axios/index.js";

import { ref, inject, reactive } from "vue";

const emit = defineEmits(["closeEditModal", "updateCategory"]);

let name = inject("name").value;
let description = inject("description").value;
let id = inject("id").value;

let categoryName = ref(name);
let categoryDescription = ref(description);
let categoryId = ref(id);

function sendEditedCategoryInfo() {
  // editCategory
  const category = reactive({
    id: categoryId,
    name: categoryName,
    description: categoryDescription,
  });
  axios.put(`categories/${categoryId.value}`, category).then(() => {
    emit("closeEditModal");
    emit("updateCategory", category);
  });
}
</script>
