<template>
  <div class="visible">
    <div class="flex w-1/4 flex-col rounded border bg-gray-100">
      <Form @submit="sendEditedCategoryInfo">
        <v-container>
          <Field
            name="name"
            as="v-text-field"
            type="text"
            v-model="categoryName"
            label="სახელი"
            rules="required|min:3"
            hide-details
            placeholder="Category Name"
          />
          <ErrorMessage name="name" class="text-red-500" />
          <Field
            name="description"
            as="v-text-field"
            type="text"
            placeholder="Description"
            v-model="categoryDescription"
            label="აღწერა"
            rules="required|min:3"
            hide-details
          />
          <ErrorMessage name="description" class="text-red-500" />
        </v-container>
        <v-card-actions class="flex justify-between pt-0">
          <button>
            <v-btn variant="flat" color="primary"> Save Changes</v-btn>
          </button>
          <v-btn variant="flat" color="error" @click="$emit('closeEditModal')">
            Close
          </v-btn>
        </v-card-actions>
      </Form>
    </div>
  </div>
</template>

<script setup>
import axios from "@/plugins/axios/index.js";

import { ref, inject, reactive } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { setLocale } from "@vee-validate/i18n";

const emit = defineEmits(["closeEditModal", "updateCategory"]);
setLocale("ka");

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
