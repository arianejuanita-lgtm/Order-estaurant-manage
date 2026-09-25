<script setup lang="ts">
import { Button } from "@/components/ui/button";

const props = withDefaults(
  defineProps<{
    title: string;
    haut?: number;
    type?: 'button' | 'submit' | 'reset';
    class?: string;
  }>(),
  {
    haut: 50,
    type: 'button',
    class: ''
  }
);
</script>

<template>
  <Button 
    :type="props.type"
    :style="{ height: props.haut + 'px' }"
    :class="[
      'bg-amber-400 border border-amber-400 rounded-[20px] cursor-pointer font-bold text-black hover:bg-amber-500 transition-colors',
      props.class
    ]"
  >
    {{ title }}
  </Button>
</template>