<script lang="ts" setup>
defineProps<{
  label: string;
  value: string;
  valueClass?: string;
}>();
</script>

<template>
  <div class="flex justify-between items-center text-[0.95rem] text-neutral-700">
    <p class="m-0">{{ label }}</p>
    <p class="m-0" :class="valueClass || ''">{{ value }}</p>
  </div>
</template>