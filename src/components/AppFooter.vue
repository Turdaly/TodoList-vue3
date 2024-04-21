<template lang="">
  <footer class="app-footer">{{ lactive }} more to do, {{ ldone }} done</footer>
</template>

<script setup lang="ts">
defineProps({
  ldone: Number,
  lactive: Number,
});

</script>
