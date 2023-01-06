<script setup>
// import { RouterView } from "vue-router";
import AdminLayout from "./layouts/AdminLayout.vue";
</script>

<template>
  <AdminLayout />
  <RouterView class="flex justify-center" />
  <!-- NOTE: using routerview in adminLayout renders view in adminlayout -->
</template>
