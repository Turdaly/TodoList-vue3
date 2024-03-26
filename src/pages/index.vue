<template>
  <section>
    <AppHeader />
    <AppFilters :activeFilter="activeFilter"/>
    <AppTodoList
      :todos="filterTodos"
      @onClickDone="onClickDone"
      @onClickDelete="onClickDelete"
    />
    <AppAdd @addTask="addTask" />
    <AppFooter />
  </section>
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFilters from "@/components/AppFilters.vue";
import AppTodoList from "@/components/AppTodoList.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppAdd from "@/components/AppAdd.vue";
import type { log } from "console";

import type { Todo, Filters } from "@/types/todo";

import { ref, computed } from "vue";

const todos = ref<Todo[]>([
  { id: 75, title: "learn Html", completed: true },
  { id: 456, title: "learn Js", completed: false },
  { id: 47, title: "learn Vue", completed: false },
]);

const activeFilter = ref<Filters>("All");

const filterTodos = computed(() => {
  switch(activeFilter.value) {
    case "All":
      return todos.value
    case "Active":
      return activeTodos()
    case "Done":
      return doneTodos()
    default:
      return null
  }
})

function onClickDone(id: Number) {
  const targetTodoIndex = todos.value.findIndex((todo) => todo.id === id);
  if (targetTodoIndex !== -1) {
    todos.value[targetTodoIndex].completed =
      !todos.value[targetTodoIndex].completed;
  }
}

function onClickDelete(id: Number) {
  const targetTodoIndex = todos.value.findIndex((todo) => todo.id === id);
  todos.value.splice(targetTodoIndex, 1);
}

function addTask(text) {
  const todoItem = { id: Math.random() * 100, title: text.value };
  console.log(todoItem);
  todos.value.push(todoItem);
}

function activeTodos() {
  return todos.value = todos.value.filter(todos => todos.completed)
}
function doneTodos() {
  return todos.value = todos.value.filter(todos => todos.completed)
}
</script>
