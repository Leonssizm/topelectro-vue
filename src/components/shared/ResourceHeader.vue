<template>
  <div class="ml-6 flex">
    <div class="mt-8 flex text-xl">
      <v-card v-for="[name] in classes" :key="name" class="my-4">
        <h1 class="text-h5 bg-emerald-50">
          {{ $t(`navBar.${props.header}`) }}
        </h1>
      </v-card>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["header"]);
const classes = [["Heading 5", "text-h5"]];
</script>
