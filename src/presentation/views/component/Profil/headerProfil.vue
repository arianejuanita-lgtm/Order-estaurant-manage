<script lang="ts" setup>
defineProps<{
    editable:boolean;
    toggleEdit:()=>void;
    isEditing:boolean
}>();
</script>

<template>
     <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-xl font-bold text-gray-900">My Profile</h1>
          <p class="text-sm text-gray-500">Manage your personal information and preferences.</p>
        </div>
        <button 
          v-if="editable"
          type="button"
          @click="toggleEdit"
          class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:border-[#F5BE18] hover:text-gray-900 transition-colors cursor-pointer"
        >
          <Edit3 :size="16" />
          {{ isEditing ? 'Save Changes' : 'Edit Profile' }}
        </button>
      </div>
</template>