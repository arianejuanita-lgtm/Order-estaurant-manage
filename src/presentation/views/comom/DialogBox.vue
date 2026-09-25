<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { MenuItem } from '@/domain/entities/MenuItem';
import { Check, AlertTriangle, Edit3 } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import Boutton from '@/presentation/views/comom/Boutton.vue';

const router = useRouter();

type DialogMode = 'add' | 'edit' | 'delete';

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    item: MenuItem | null;
    mode?: DialogMode;
  }>(),
  {
    mode: 'add', 
  }
);

const emit = defineEmits(['close', 'confirm']);
const handleSubmit = () => {
  emit('confirm');
  router.push("/home");
};

const dialogRef = ref<HTMLDialogElement | null>(null);

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    dialogRef.value?.showModal();
  } else {
    dialogRef.value?.close();
  }
});

const closeDialog = () => {
  emit('close');
};

const config = computed(() => {
  switch (props.mode) {
    case 'edit':
      return {
        title: 'Update Item',
        message: `Are you sure you want to update `,
        confirmText: 'Save Changes',
        iconBg: 'bg-blue-100 text-blue-600',
        confirmClass: 'bg-amber-400 hover:bg-amber-500 border-amber-400 text-black',
      };
    case 'delete':
      return {
        title: 'Delete Item',
        message: `Are you sure you want to delete `,
        confirmText: 'Delete',
        iconBg: 'bg-red-100 text-red-600',
        confirmClass: 'bg-red-500 hover:bg-red-600 border-red-500 text-white',
      };
    case 'add':
    default:
      return {
        title: 'New Item Created',
        message: `We have successfully prepared `,
        confirmText: 'Confirm',
        iconBg: 'bg-amber-100 text-amber-400',
        confirmClass: 'bg-amber-400 hover:bg-amber-500 border-amber-400 text-black',
      };
  }
});
</script>

<template>
  <dialog 
    ref="dialogRef" 
    @close="closeDialog"
    class="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-2xl backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm open:flex open:flex-col open:w-[90%] sm:open:max-w-md m-auto"
  >
    <div class="text-center mb-6">
      <div :class="['mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4', config.iconBg]">
        <Check v-if="mode === 'add'" class="h-6 w-6" />
        <Edit3 v-else-if="mode === 'edit'" class="h-6 w-6" />
        <AlertTriangle v-else-if="mode === 'delete'" class="h-6 w-6" />
      </div>

      <h3 class="text-base sm:text-lg font-bold text-gray-900">
        {{ config.title }}
      </h3>

      <p class="text-xs sm:text-sm text-gray-600 mt-1">
        {{ config.message }} <span class="font-semibold text-gray-900">{{ props.item?.name }}</span>?
      </p>
    </div>
        
   <div class="flex items-center justify-center gap-3 mt-2">
      <Boutton
        title="Cancel"
        :haut="40"
        type="button"
        @click="closeDialog"
        class="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-semibold px-4 sm:px-5"
      />

      <Boutton
        :title="config.confirmText"
        :haut="40"
        type="button"
        @click="handleSubmit"
        :class="['text-xs sm:text-sm px-5 sm:px-6 shadow-sm', config.confirmClass].join(' ')"
      />
    </div>
  </dialog>
</template>