<template>
  <section class="add-todo">
    <button
      v-if="!isFormVisible"
      class="add-todo__show-form-button"
      @click="showForm"
    >
    <box-icon name='plus' color="#dc2626"></box-icon>
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
import { ref } from "vue";

const todoText = ref<string>("")
const isFormVisible = ref<boolean>(true);

const emit = defineEmits(["addTask"]);

const addTask = (): void => {
  if (todoText.value.length > 0) {
    emit("addTask", todoText.value);
  }
  todoText.value = "";
}

const showForm = (): void => {
  isFormVisible.value = !isFormVisible.value;
}
</script>
