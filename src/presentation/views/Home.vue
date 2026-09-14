<script setup lang="ts">
import Searched from "./comom/Searched.vue";
import Filter from "./filter.vue";
import MenuItemList from "./MenuItemList.vue";
</script>

<template>
  <div class="grid grid-cols-[max-content_1fr] w-screen box-border px-2.5 mt-[15px] gap-5">
    <div>
      <Filter class="bg-slate-100 rounded-[20px] border border-gray-400" />
    </div>
    
    <div>
      <div class="flex justify-end w-full">
        <Searched />
      </div>

      <div>
        <MenuItemList/>
      </div>
    </div>
  </div>
</template>
