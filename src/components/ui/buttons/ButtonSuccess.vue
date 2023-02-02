<template>
  <button
    class="rounded bg-green-500 py-2 px-3 font-bold text-white hover:bg-green-700"
    type="button"
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
