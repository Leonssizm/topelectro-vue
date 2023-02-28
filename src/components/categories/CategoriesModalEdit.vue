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

<script setup>
import axios from "@/plugins/axios/index.js";
import ButtonWarning from "@/components/ui/buttons/ButtonWarning.vue";
import ButtonSuccess from "@/components/ui/buttons/ButtonSuccess.vue";

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
