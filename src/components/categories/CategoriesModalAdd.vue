<template>
  <div class="visible">
    <div class="flex w-1/4 flex-col rounded border bg-green-100">
      <Form @submit="createNewCategory">
        <v-container>
          <Field
            name="name"
            v-model="category.name"
            rules="required"
            class="mb-0"
          >
            <v-text-field
              type="text"
              placeholder="Category"
              label="Category Name"
              hide-details
            ></v-text-field>
          </Field>

          <ErrorMessage name="name" class="text-red-500" />
          <Field ref="category.description" name="description" rules="required">
            <v-text-field
              type="text"
              placeholder="Description"
              label="Description"
              hide-details
            ></v-text-field>
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
import { reactive } from "vue";
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
