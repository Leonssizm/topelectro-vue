<template>
  <div class="visible">
    <div class="flex w-1/4 flex-col rounded border bg-green-100">
      <Form @submit="createNewCategory">
        <v-container>
          <Field
            as="v-text-field"
            label="სახელი"
            name="name"
            rules="required|min:3"
            class="mb-0"
            hide-details
            v-model="category.name"
          >
            <v-field-label>Category Name</v-field-label>
          </Field>
          <ErrorMessage name="name" class="text-red-500" />
          <Field
            as="v-text-field"
            label="აღწერა"
            name="description"
            rules="required|min:3"
            hide-details
            v-model="category.description"
          >
            <v-field-label>Category Description</v-field-label>
          </Field>
          <ErrorMessage name="description" class="text-red-500" />
        </v-container>
        <v-card-actions class="flex justify-between pt-0">
          <button>
            <v-btn variant="flat" color="primary"> Add Category</v-btn>
          </button>
          <v-btn variant="flat" color="error" @click="$emit('closeAddModal')">
            Close
          </v-btn>
        </v-card-actions>
      </Form>
    </div>
  </div>
</template>

<script setup>
import axios from "@/plugins/axios/index.js";
import { useCategoriesStore } from "@/stores/useCategoriesStore";
import { Form, Field, ErrorMessage } from "vee-validate";
import { setLocale } from "@vee-validate/i18n";
import { reactive } from "vue";

setLocale("ka");
const emit = defineEmits(["closeAddModal"]);

const categoriesStore = useCategoriesStore();

const category = reactive({
  name: "",
  description: "",
});

function createNewCategory(value) {
  console.log(value);
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
