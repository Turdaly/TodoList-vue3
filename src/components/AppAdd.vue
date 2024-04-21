<template lang="">
  <section class="add-todo">
    <button
      v-if="!isFormVisible"
      class="add-todo__show-form-button"
      @click="showForm"
    >
      <i class="bi bi-plus-lg"></i>
    </button>
    <form v-else class="add-todo__form" @submit.prevent="default">
      <button class="close-button" type="button">
        <i class="bi bi-x" @click="showForm"></i>
      </button>
      <div class="text-input text-input--focus">
        <input class="input" v-model.trim="todoText" />
      </div>
      <button class="button button--filled" @click="addTask">Add task</button>
    </form>
  </section>
</template>
<script setup lang="ts">
import { ref, type ModelRef } from "vue";

const todoText = ref<String>("")
const isFormVisible = ref<Boolean>(false);
const emit = defineEmits(["addTask"]);
function addTask() {
  if (todoText.value.length > 0) {
    emit("addTask", todoText.value);
  }
  todoText.value = "";
}
function showForm() {
  isFormVisible.value = !isFormVisible.value;
}
</script>
<style lang=""></style>
