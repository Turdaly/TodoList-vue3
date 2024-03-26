<template lang="">
  <aside class="app-filters">
    <section class="toggle-group">
      <button
        class="button cursor-pointer"
        :class="['button--primary' ? activeFilter === 'filter' : '']"
        v-for="(filter, i) in filters"
        :key="i"
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

defineProps(['activeFilter'])
const filters = ["All", "Active", "Done"];
const emit = defineEmits(["onClickDone", "onClickDelete"]);
</script>
<style lang=""></style>
