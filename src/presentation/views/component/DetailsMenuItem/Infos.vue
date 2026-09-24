<script setup lang="ts">
import { ref, watch } from "vue";
import { MenuItem } from "@/domain/entities/MenuItem";
import Suppersed from "../../comom/Suppersed.vue";
import Pencilc from "../../comom/Pencilc.vue";
import Sticker from "../../comom/sticker.vue";
import Smallimage from "../../comom/Smallimage.vue";
import { Dot, Utensils } from "lucide-vue-next";
import Reviews from "../../comom/Reviews.vue";
import PrepCom from "../../comom/prepCom.vue";
import { LayoutGrid, HandCoins, ShoppingBag, Clock5, Warehouse, GamepadDirectional } from 'lucide-vue-next';
import logo from '../../../../assets/logo.png';
import DietComp from "../../comom/dietComp.vue";

const props = defineProps<{
  item: MenuItem;
}>();

const currentImage = ref(props.item.image);

watch(() => props.item.image, (newImg) => {
  currentImage.value = newImg;
});

const changeImage = (url: string) => {
  currentImage.value = url;
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = logo;
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch bg-white p-3 rounded-3xl">
    
    <div class="flex flex-col justify-between h-full gap-4">
      <div class="relative w-full h-[180px] md:h-[360px] rounded-2xl overflow-hidden shadow-sm bg-gray-50">
        <!-- <Suppersed>
          <template #left>
            <div v-if="item.isPopular">
              <Sticker name="Popular" color="white" back-color="#F5BE18" />
            </div>
          </template>
          <template #right>
            <Pencilc />
          </template>
        </Suppersed> -->
        
        <img :src="currentImage || logo" :alt="item.name" @error="handleImageError" class="w-full h-full object-cover transition-all duration-300" />
      </div>

      <div v-if="item.gallery && item.gallery.length > 0" class="mt-auto">
        <Smallimage :gallery="item.gallery" @select-image="changeImage" />
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
          <span class="text-xs font-semibold text-gray-400"></span>
        </div>

        <div>
          <div v-if="item.isAvailable">
            <Sticker
              :icon="Dot"
              name="Available"
              color="#065f46"
              border-color="#a7f3d0"
              back-color="#ecfdf5"
            />
          </div>
          <div v-else>
            <Sticker
              :icon="Dot"
              name="Unavailable"
              color="#991b1b"
              border-color="#fecaca"
              back-color="#fef2f2"
            />
          </div>
        </div>
      </div>
      <DietComp :item="item.dietary"/>
      <DietComp :item="item.portionSizes"/>

      <div>
        <Reviews :rating="item.rating" :reviews="item.reviews" />
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <PrepCom 
            title="Preparation time" 
            :item="item.preparationTime" 
            :icon="Clock5" 
            label="min"
        />
        
        <PrepCom
            title="Available stock"
            :item="item.stock.quantity"
            :icon="Warehouse"
            label="units"
        />
        
        <PrepCom
            title="VAT"
            label="%"
            :icon="GamepadDirectional"
            :item="item.vat"
        />
      </div>

      <div class="flex gap-2 p-1 bg-[#fffbeb]/40 border border-[#fef3c7] rounded-xl">
        <div class="flex flex-col gap-1">
          <h2 class="text-base font-bold text-gray-800 tracking-wide text-[14px]">Main information</h2>
          <div class="flex flex-wrap items-center gap-4">
            <PrepCom 
                title="Category" 
                :item="item.category" 
                :icon="LayoutGrid" 
                colorIcone="#F5BE18"
            />
            
            <PrepCom
                title="Sale Price"
                :item="item.price"
                :icon="HandCoins"
                label="$"
                colorIcone="#F5BE18"
            />
            
            <PrepCom
                title="Disponibility"
                :label="item.isAvailable ? 'Available to sale' : 'Unavailable to sale'"
                :icon="ShoppingBag"
                colorIcone="#F5BE18"
            />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>