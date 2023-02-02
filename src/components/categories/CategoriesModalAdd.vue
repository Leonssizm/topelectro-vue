<template>
  <div class="visible">
    <div class="flex w-1/4 flex-col rounded border bg-green-100">
      <div class="mb-4 px-2">
        <label class="mb-1 block text-sm">Category Name:</label>
        <input
          class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
          type="text"
          autofocus
          placeholder="Category"
          v-model="name"
        />
      </div>

      <div class="mb-4 px-2">
        <label class="mb-1 block text-sm">Description:</label>
        <textarea
          class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
          type="text"
          autofocus
          placeholder="Description"
          v-model="description"
        ></textarea>
      </div>

      <div class="mb-2 flex justify-around">
        <ButtonSuccess
          @click="
            $emit('createNewCategory', {
              name: this.name,
              description: this.description,
            })
          "
          content="Add"
        />
        <ButtonWarning @click="$emit('closeAddModal')" />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonWarning from "@/components/ui/buttons/ButtonWarning.vue";
import ButtonSuccess from "@/components/ui/buttons/ButtonSuccess.vue";

export default {
  components: {
    ButtonWarning,
    ButtonSuccess,
  },
  data() {
    return {
      description: "",
      name: "",
    };
  },
};
</script>
