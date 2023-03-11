import { defineRule } from "vee-validate";

defineRule("required", (value) => {
  if (!value || !value.length) {
    return false;
  }
  return true;
});

defineRule("email", (value) => {
  if (!/[a-z]/.test(value)) {
    return "დროზე მეთქი";
  }

  return true;
});
