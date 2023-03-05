<template>
  <div class="flex bg-cyan-50">
    <nav>
      <div class="flex-row">
        <RouterLink to="/" class="flex space-x-4 px-4 py-8">
          <IconMain title="Main" />
        </RouterLink>
        <div class="flex-row">
          <RouterLink to="/categories" class="flex space-x-3 px-3 pl-5">
            <IconCategories title="Categories" />
          </RouterLink>
          <RouterLink to="/products" class="flex space-x-4 px-3 pt-4 pl-5">
            <IconProducts title="Products" />
          </RouterLink>
          <RouterLink to="/users" class="flex space-x-4 px-3 pt-4 pl-5">
            <IconUsers title="Users" />
          </RouterLink>
          <RouterLink to="/comments" class="flex space-x-4 px-3 py-4 pl-5">
            <IconComments title="Comments" />
          </RouterLink>
        </div>
      </div>
    </nav>
    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>
<script setup>
import IconMain from "@/components/icons/IconMain.vue";
import IconCategories from "@/components/icons/IconCategories.vue";
import IconProducts from "@/components/icons/IconProducts.vue";
import IconUsers from "@/components/icons/IconUsers.vue";
import IconComments from "@/components/icons/IconComments.vue";
</script>
