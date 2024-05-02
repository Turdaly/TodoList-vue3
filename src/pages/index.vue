<template>
  <section>
    <auth class="ml-20 mb-10" @handleLoginSuccess="handleResponse" v-if="accountStore.isAccountEmpty"/>
    <Navbar :account="accountStore.account"/>
    <AppHeader />
    <AppFilters :activeFilter="activeFilter" @sendFilter="setFilter" />
    <transition-group tag="ul" name="list" class="mt-12">

      <AppTodoItem
      v-for="todo in filterTodos"
      :key="todo.id"
      :todo="todo"
      class="mt-4"
      @onClickDone="onClickDone"
      @onClickDelete="deleteTodos"
    />
    </transition-group>
    <AppAdd @addTask="onAddTodo"/>
    <AppFooter :todos="todos" />
  </section>
</template>

<script setup lang="ts">
import axios from "axios";

import AppHeader from "@/components/AppHeader.vue";
import AppFilters from "@/components/AppFilters.vue";
import AppTodoItem from "@/components/AppTodoItem.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppAdd from "@/components/AppAdd.vue";
import auth from "@/components/auth.vue";
import Navbar from "@/components/Navbar.vue";

import { useAccountStore } from "@/stores/AccoutStore"
import { ref,  computed, onMounted } from "vue";

// Types
import type { Todo } from "@/types/todo";
import { Filters } from "@/types/todo";

import type { CredentialResponse, } from "vue3-google-signin"
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode"

// State

const todos = ref<Todo[]>([]);
const activeFilter = ref<Filters>(Filters.ALL);
const response = ref<string | undefined>("")
const accountStore = useAccountStore()
const url = "https://660471452ca9478ea17dfeb7.mockapi.io/TodoList/todos"

const changeToken = (access_token: CredentialResponse) => {
  const token:string = access_token.credential;
  const decoded = jwtDecode<JwtPayload>(token);

  const decodedHeader = jwtDecode(token, { header: true });
  console.log(decoded)
  return decoded
}

const handleResponse = async (access_token: CredentialResponse) => {
  accountStore.setAccount(changeToken(access_token))
  response.value = accountStore.account.email
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
      `${url}`
    );
    data = data.filter(todo => todo["owner"] === response.value)
    todos.value = data;
  } catch (err) {
    console.log(err);
  }
};
// Add Todos
const addTodos = async (text: string) => {
  try {
    await axios.post(`${url}`, {
      title: text,
      owner: response.value
    });
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

// Delete Todos
const deleteTodos = async (id: number) => {
  try {
    await axios.delete(`${url}/${id}`);
    todos.value = todos.value.filter(data => data.id !== id)
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
const onClickDone = (id: number) => {
  const targetTodoIndex = todos.value.findIndex((todo) => todo.id === id);
  if (targetTodoIndex !== -1) {
    todos.value[targetTodoIndex].completed =
      !todos.value[targetTodoIndex].completed;
  }
}

const setFilter = (filter: Filters): void => {
  activeFilter.value = filter;
}


onMounted(async () => {
  await fetchTodos();
});
</script>

<style scoped>
/* list transition */

.list-leave-to,
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.list-leave-from,
.list-enter-to {
  opacity: 1;
  transform: scale(1);
}
.list-leave-active,
.list-enter-active {
  transition: all 0.4s ease;
}
</style>