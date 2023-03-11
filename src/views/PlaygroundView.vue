<template>
  <Form @submit="submit">
    <Field name="name" class="block bg-gray-200" rules="required|email" />
    <ErrorMessage name="name" class="block" />
    <button>Submit</button>
  </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { setLocale } from "@vee-validate/i18n";
setLocale("ka");
function submit() {
  console.log("HELLO");
}
</script>
