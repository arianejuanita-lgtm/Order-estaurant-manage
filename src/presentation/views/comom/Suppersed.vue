<script setup lang="ts">

</script>

<template>
  <div class="absolute top-2 left-2 right-2 flex justify-between pointer-events-none">
    <div class="pointer-events-auto"><slot name="left" /></div>
    <div class="pointer-events-auto"><slot name="right" /></div>
  </div>
</template>