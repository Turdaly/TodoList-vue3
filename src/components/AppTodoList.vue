<script setup lang="ts">
import AppTodoItem from "@/components//AppTodoItem.vue";

defineProps(["todos"]);
const emit = defineEmits(['onClickDone', 'onClickDelete'])

</script>

<template>
  <ul class="todo-list">
    <AppTodoItem
      v-for="todo in todos"
      :key="todo.id"
      :id="todo.id"
      :title="todo.title"
      :completed="todo.completed"
      :onClickDone="() => emit('onClickDone', todo.id)"
      :onClickDelete="() => emit('onClickDelete', todo.id)"
    />
  </ul>
</template>

