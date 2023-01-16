<template>
  <button
    class="rounded bg-blue-500 py-2 px-3 font-bold text-white hover:bg-blue-700"
  >
    {{ content }}
  </button>
</template>

<script scoped>
export default {
  props: {
    content: String,
  },
};
</script>
