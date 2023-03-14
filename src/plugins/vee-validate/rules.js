import { min, alpha_dash } from "@vee-validate/rules";
import { defineRule } from "vee-validate";

defineRule("required", (value) => {
  if (!value || !value.length) {
    return false;
  }
  return true;
});

defineRule("min", min);
defineRule("alpha_dash", alpha_dash);
defineRule("price", (value) => {
  const regex = /^[.0-9]+$/;
  if (!regex.test(value)) {
    return "ფასის ფორმატი არასწორია. მაგ: 74.00 ან 11.99";
  }
  return true;
});

defineRule("image", (files) => {
  if (!files) {
    return false;
  } else {
    return true;
  }
});
