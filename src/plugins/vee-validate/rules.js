import { min } from "@vee-validate/rules";
import { defineRule } from "vee-validate";

defineRule("required", (value) => {
  if (!value || !value.length) {
    return false;
  }
  return true;
});

defineRule("min", min);
