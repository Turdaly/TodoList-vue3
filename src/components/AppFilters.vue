<template>
  <aside class="app-filters">
    <section class="toggle-group">
      <button
        v-for="(filter, i) in filters"
        :key="i"
        class="button cursor-pointer"
        :class="[filter === activeFilter.activeFilter ? 'button--primary' : '']"
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
  activeFilter: {
    type: String as () => Filters,
    default: Filters.ALL
  }
});
const filters: Filters[] = [Filters.ALL, Filters.ACTIVE, Filters.DONE];

const emit = defineEmits(["sendFilter"]);

const sendFilter = (filter:Filters) => {
  emit("sendFilter", filter);
}
</script>
