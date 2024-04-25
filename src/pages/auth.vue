<script setup lang="ts">
import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";

const emit = defineEmits(["handleLoginSuccess"])
// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
  console.log("Access Token", response);
  emit("handleLoginSuccess", response)
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};
</script>

<template>
  <GoogleSignInButton
    @success="handleLoginSuccess"
    @error="handleLoginError"
  ></GoogleSignInButton>
</template>