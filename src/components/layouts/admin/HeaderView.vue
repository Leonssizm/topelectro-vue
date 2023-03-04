<template>
  <nav class="navbar bg-white">
    <div class="max-w-6x1 mx-auto px-10">
      <div class="flex justify-between">
        <div class="flex space-x-4">
          <!-- Logo -->
          <div class="flex">
            <IconLogo />
          </div>
        </div>
        <div class="flex items-center px-5">
          <!-- secondary nav Buttons -->
          <IconNavButtons />
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import IconLogo from "@/components/icons/IconLogo.vue";
import IconNavButtons from "@/components/icons/IconNavigation.vue";
</script>
