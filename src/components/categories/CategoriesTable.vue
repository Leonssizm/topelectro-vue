<template>
  <v-table theme="dark">
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">Category Name</th>
        <th class="text-left">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="category in categoriesStore.list" :key="category.id">
        <td>{{ category.id }}</td>
        <td>{{ category.name }}</td>
        <td width="900px">{{ category.description }}</td>
        <td>
          <button
            type="button"
            class="text-green-500 hover:text-green-700"
            @click="$emit('openEditCategoryModal', category.id)"
          >
            <IconEdit />
          </button>
        </td>
        <td>
          <button
            type="button"
            class="text-red-500 hover:text-red-700"
            @click="$emit('deleteCategory', category.id)"
          >
            <IconDelete />
          </button>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import IconEdit from "@/components/icons/IconEdit.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import { useCategoriesStore } from "@/stores/useCategoriesStore";
import "@/assets/main.css";

const categoriesStore = useCategoriesStore();
</script>
