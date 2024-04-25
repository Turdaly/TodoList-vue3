<template>
  <section>
    <auth class="ml-20 mb-10" @handleLoginSuccess="handleResponse"/>
    <AppHeader />
    <AppFilters :activeFilter="activeFilter" @sendFilter="setFilter" />
    <AppTodoList
      :todos="filterTodos"
      @onClickDone="onClickDone"
      @onClickDelete="onClickDelete"
    />
    <AppAdd @addTask="onAddTodo"/>
    <AppFooter :todos="todos" />
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

import { ref, computed, onMounted } from "vue";

// Types
import type { Todo, Filters } from "@/types/todo";

import { GoogleSignInButton, type CredentialResponse, } from "vue3-google-signin"
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "@/types/jwt"

// State

const changeToken = (access_token: CredentialResponse) => {
  let token: string = "";
  token = access_token.credential
  const decoded = jwtDecode<JwtPayload>(token);

  const decodedHeader = jwtDecode(token, { header: true });
  return decoded.email
}

const todos = ref<Todo[]>([]);
const activeFilter = ref<Filters>("All");
const response = ref<string | null>(null)


const handleResponse = async (access_token: CredentialResponse) => {
  response.value = changeToken(access_token)
  try {
    await fetchTodos()
  }catch(err){
    console.log(err)
  }
}

// Get Todos
const fetchTodos = async () => {
  try {
    let { data }: {data: Todo[]} = await axios.get(
      "https://660471452ca9478ea17dfeb7.mockapi.io/TodoList/todos"
    );
    data = data.filter(todo => todo["owner"] === response.value)
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
      owner: response.value
    });
  } catch (err) {
    console.log(err);
  }
};

// Delete Todos
const deleteTodos = async (id: number) => {
  try {
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



onMounted(async () => {
  await fetchTodos();
});
</script>
