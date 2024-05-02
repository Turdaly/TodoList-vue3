<template>
  <li
    :class="[todo?.completed ? 'todo-item--done' : '']"
    class="todo-item"
    @click="onClickDone"
  >
    <div class="todo-item__status">
      <i class="bi bi-check2"></i>
    </div>
    <span class="todo-item__text">{{ todo?.title }}</span>
    <button class="todo-item__remove-button" @click="onClickDelete">
      <i class="bi bi-trash3"></i>
    </button>
  </li>
</template>

<script setup lang="ts">
import type { Todo } from "@/types/todo";
const props = defineProps({
  todo: Object as () => Todo
});

const emit = defineEmits(['onClickDone', 'onClickDelete'])

const onClickDone = () => {
  emit('onClickDone', props.todo?.id)
}

const onClickDelete = () => {
  emit('onClickDelete', props.todo?.id)
}
</script>
