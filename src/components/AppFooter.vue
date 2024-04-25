<template lang="">
  <footer class="app-footer">{{ activeTodos}} more to do, {{ doneTodos }} done</footer>
</template>

<script setup lang="ts">
import type { Todo } from "@/types/todo"
import { computed, toRef, toRefs } from "vue";

// const { todos }: { todos: Todo[] } = defineProps();
const props = defineProps({
  todos: Array as () => Todo[]
})

const activeTodos = computed(() => props.todos?.filter((todo) => !todo.completed).length)

const doneTodos = computed(() => props.todos?.filter((todo) => todo.completed).length)

</script>
