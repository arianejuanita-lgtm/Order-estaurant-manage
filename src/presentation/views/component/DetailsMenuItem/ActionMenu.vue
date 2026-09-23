<script setup lang="ts">
import { MenuItem } from '@/domain/entities/MenuItem';
import RapidActionComp from '../../comom/rapidActionComp.vue';
import { Pencil, Eye, Copy, Trash2 } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { useMenuItem } from '@/presentation/stores/useMenuItem.ts';
import { ref } from 'vue';
import DialogBox from '../../comom/DialogBox.vue';

const menu=useMenuItem();
const props= defineProps<{
    item: MenuItem;
}>();
const isDialogOpen = ref<boolean>(false);
const router=useRouter();
const redirect=()=>{
    router.push('/');
}

const openDeleteDialog = () => {
  isDialogOpen.value = true;
};

const handleConfirmDelete = () => {
  menu.deleteMenuItem(props.item.id);
  isDialogOpen.value = false;
  redirect();
};
</script>

<template>
    <div class="flex flex-col gap-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h2 class="text-sm font-bold text-gray-800 tracking-wide">Rapid Actions </h2>
        
        <div class="flex flex-wrap items-center gap-2.5">
            <RapidActionComp 
                name="Update" 
                :icon="Pencil" 
                backColor="#fffbeb" 
                borderColor="#fde68a" 
                color="#92400e" 
                iconColor="#F5BE18" 
            />
            
            <!-- <RapidActionComp 
                name="Duplicate" 
                :icon="Copy" 
                backColor="#f9fafb" 
                borderColor="#e5e7eb" 
                color="#374151" 
                iconColor="#4b5563" 
            /> -->
            
            <RapidActionComp 
                name="See" 
                :icon="Eye" 
                backColor="#f9fafb" 
                borderColor="#e5e7eb" 
                color="#374151" 
                iconColor="#4b5563" 
                :click="redirect"
            />
            
            <RapidActionComp 
                name="Delete" 
                :icon="Trash2" 
                backColor="#fef2f2" 
                borderColor="#fecaca" 
                color="#991b1b" 
                iconColor="#ef4444" 
                :click="openDeleteDialog"
            />

                <DialogBox
      :item="item"
      :isOpen="isDialogOpen"
      mode="delete"
      @close="isDialogOpen = false"
      @confirm="handleConfirmDelete"
    />
        </div>
    </div>
</template>