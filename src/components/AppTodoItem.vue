<script setup lang="ts">
defineProps({
  id: Number,
  title: String,
  completed: Boolean,
  onClickDone: Function,
  onClickDelete: Function
});
</script>

<template lang="">
  <li
    :class="[completed ? 'todo-item--done' : '']"
    class="todo-item"
    @click="onClickDone"
  >
    <div class="todo-item__status">
      <i class="bi bi-check2"></i>
    </div>
    <span class="todo-item__text">{{ title }}</span>
    <button class="todo-item__remove-button" @click="onClickDelete">
      <i class="bi bi-trash3"></i>
    </button>
  </li>
</template>
