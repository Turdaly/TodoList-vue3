<template lang="">
  <aside class="app-filters">
    <section class="toggle-group">
      <button
        class="button cursor-pointer"
        :class="[filter === activeFilter ? 'button--primary' : '']"
        v-for="(filter, i) in filters"
        :key="i"
        @click="sendFilter(filter)"
      >
        {{ filter }}
      </button>
    </section>
  </aside>
</template>
<script setup lang="ts">
import AppTodoList from "@/components/AppTodoList.vue";
import type { Filters } from "@/types/todo";
import type { ref } from "vue";

const { activeFilter } = defineProps(["activeFilter"]);
const filters = ["All", "Active", "Done"];

const emit = defineEmits(["sendFilter"]);
function sendFilter(filter) {
  return emit("sendFilter", filter);
}
</script>
<style lang=""></style>
