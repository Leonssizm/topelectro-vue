<template>
  <div class="relative max-w-xs">
    <label for="hs-table-search" class="sr-only"> Search </label>
    <input
      type="text"
      name="search"
      class="block w-full rounded-md border-gray-200 p-3 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
      placeholder="Search..."
    />
    <div
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"
    >
      <IconSearch />
    </div>
  </div>
</template>

<script setup>
import IconSearch from "@/components/icons/IconSearch.vue";
</script>
