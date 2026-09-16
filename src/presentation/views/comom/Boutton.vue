<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  haut: {
    type: Number,
    default: 50
  },
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button' 
  },
  class: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <button 
    :style="{ height: props.haut + 'px' }"
    :type="props.type"
    :class="props.class"
    class="flex items-center justify-center bg-amber-400 border border-amber-400 px-5 rounded-[20px] cursor-pointer font-bold text-black transition-colors hover:bg-amber-500"
  >
    {{ title }}
  </button>
</template>