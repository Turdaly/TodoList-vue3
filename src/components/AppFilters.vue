<template>
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
import { Filters } from "@/types/todo";

const activeFilter = defineProps({
  activeFilter: String as () => Filters
});
const filters: Filters[] = [Filters.ALL, Filters.ACTIVE, Filters.DONE];

const emit = defineEmits(["sendFilter"]);

const sendFilter = (filter:Filters) => {
  emit("sendFilter", filter);
}
</script>
