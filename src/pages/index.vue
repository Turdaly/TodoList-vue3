<template>
  <section>
    <auth class="ml-20 mb-10" />
    <login class="ml-20 mb-10" />
    <AppHeader />
    <AppFilters :activeFilter="activeFilter" @sendFilter="setFilter" />
    <AppTodoList
      :todos="filterTodos"
      @onClickDone="onClickDone"
      @onClickDelete="onClickDelete"
    />
    <AppAdd @addTask="onAddTodo"/>
    <AppFooter :ldone="doneTodos().length" :lactive="activeTodos().length" />
    {{ filterTodos }}
  </section>
</template>

<script setup lang="ts">
import axios from "axios";

import AppHeader from "@/components/AppHeader.vue";
import AppFilters from "@/components/AppFilters.vue";
import AppTodoList from "@/components/AppTodoList.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppAdd from "@/components/AppAdd.vue";
import auth from "@/pages/auth.vue";
import login from "@/pages/login.vue";

import { ref, computed, onMounted } from "vue";

// Types
import type { Todo, Filters } from "@/types/todo";

// State
const todos = ref<Todo[]>([]);
const activeFilter = ref<Filters>("All");

// Get Todos
const fetchTodos = async () => {
  try {
    const { data } = await axios.get(
      "https://660471452ca9478ea17dfeb7.mockapi.io/TodoList/todos"
    );
    todos.value = data;
  } catch (err) {
    console.log(err);
  }
};

const onAddTodo = async (text:string) => {
  try {
    await addTodos(text)
    await fetchTodos()
  }catch(err){
    console.log(err)
  }
}
// Add Todos
const addTodos = async (text: string) => {
  try {
    await axios.post("https://660471452ca9478ea17dfeb7.mockapi.io/TodoList/todos", {
      title: text,
    });
  } catch (err) {
    console.log(err);
  }
};


// Delete Todos
const deleteTodos = async (id: number) => {
  try {
    console.log("Id = ",id)
    await axios.delete(`https://660471452ca9478ea17dfeb7.mockapi.io/TodoList/todos/${id}`);
  } catch (err) {
    console.log(err);
  }
};

const filterTodos = computed(() => {
  switch (activeFilter.value) {
    case "All":
      return todos.value;
    case "Active":
      return todos.value.filter((todos) => !todos.completed);;
    case "Done":
      return todos.value.filter((todos) => todos.completed);
    default:
      return null;
  }
});

// Methods
function onClickDone(id: number) {
  const targetTodoIndex = todos.value.findIndex((todo) => todo.id === id);
  if (targetTodoIndex !== -1) {
    todos.value[targetTodoIndex].completed =
      !todos.value[targetTodoIndex].completed;
  }
}

function onClickDelete(id: number) {
  const targetTodoIndex = todos.value.findIndex((todo) => todo.id === id);
  todos.value.splice(targetTodoIndex, 1);
  deleteTodos(id)
}

function setFilter(filter: Filters) {
  activeFilter.value = filter;
}

function activeTodos() {
  return  todos.value.filter((todos) => !todos.completed);
}
function doneTodos() {
  return todos.value.filter((todos) => todos.completed);
}

// function addTask(text) {
//   const todoItem: Todo = { id: Math.random() * 100, title: text.value };
//   todos.value.push(todoItem);
// }

onMounted(async () => {
  await fetchTodos();
});
</script>
