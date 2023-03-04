<template>
  <div class="ml-6 flex">
    <div class="mt-8 flex text-xl">
      <h1>{{ header }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    header: String,
  },
};
</script>
