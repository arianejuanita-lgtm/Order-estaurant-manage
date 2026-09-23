<script setup lang="ts">
import { MenuItem } from "@/domain/entities/MenuItem";
import Suppersed from "../../comom/Suppersed.vue";
import Pencilc from "../../comom/Pencilc.vue";
import Sticker from "../../comom/sticker.vue";
import Smallimage from "../../comom/Smallimage.vue";
import { Dot, Utensils } from "lucide-vue-next";
import Reviews from "../../comom/Reviews.vue";
import Information from "../../comom/Information.vue";

defineProps<{
  item: MenuItem;
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch bg-white p-6 rounded-3xl">
    
    <div class="flex flex-col justify-between h-full gap-4">
      <div class="relative w-full h-[360px] rounded-2xl overflow-hidden shadow-sm bg-gray-50">
        <Suppersed>
          <template #left>
            <div v-if="item.isPopular">
              <Sticker name="Populaire" color="white" back-color="#F5BE18" />
            </div>
          </template>
          <template #right>
            <Pencilc />
          </template>
        </Suppersed>
        
        <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
      </div>

      <div v-if="item.gallery && item.gallery.length > 0" class="mt-auto">
        <Smallimage :gallery="item.gallery" />
      </div>
    </div>

    <div class="flex flex-col justify-between h-full gap-4">
      
      <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-bold text-gray-900 tracking-tight">{{ item.name }}</h2>
        
        <div v-if="item.category" class="flex items-center">
          <Sticker 
            :icon="Utensils" 
            :name="item.category" 
            color="#92400e" 
            back-color="#fef3c7" 
            border-color="#fde68a" 
          />
        </div>
      </div>

      <p class="text-sm text-gray-500 leading-relaxed">{{ item.description }}</p>

      <div class="flex items-center justify-between py-1">
        <div class="flex items-baseline gap-1.5">
          <span class="text-2xl font-extrabold text-[#F5BE18]">{{ item.price }}</span>
          <span class="text-xs font-semibold text-gray-400">FCFA</span>
        </div>

        <div>
          <div v-if="item.isAvailable">
            <Sticker
              :icon="Dot"
              name="Disponible"
              color="#065f46"
              border-color="#a7f3d0"
              back-color="#ecfdf5"
            />
          </div>
          <div v-else>
            <Sticker
              :icon="Dot"
              name="Indisponible"
              color="#991b1b"
              border-color="#fecaca"
              back-color="#fef2f2"
            />
          </div>
        </div>
      </div>

      <div>
        <Reviews :rating="item.rating" :reviews="item.reviews" />
      </div>

      <Information :item="item" />

      <div class="flex gap-2 p-1 bg-[#fffbeb]/40 border border-[#fef3c7] rounded-xl">
        <Information :item="item" title="Informations principales" colorIcone="#F5BE18" />
      </div>

    </div>
  </div>
</template>