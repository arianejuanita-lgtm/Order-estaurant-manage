<script setup lang="ts">
import Searched from "./comom/Searched.vue";
import Filter from "./filter.vue";
import MenuItemList from "./MenuItemList.vue";
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-[max-content_1fr] w-screen box-border px-2.5 gap-y-0 gap-x-5">
    <div class="flex items-center justify-between md:contents ml-5 mb-0">
      <div>
        <Filter class="bg-slate-100 rounded-[20px] border border-gray-400" />
      </div>
      
      <div class="flex justify-end md:hidden">
        <Searched />
      </div>
    </div>
    
    <div class="flex flex-col gap-0 mt-0">
      <div class="hidden md:flex justify-end w-full">
        <Searched />
      </div>

      <div>
        <MenuItemList/>
      </div>
    </div>
  </div>
</template>