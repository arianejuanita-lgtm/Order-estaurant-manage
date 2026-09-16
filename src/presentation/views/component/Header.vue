<script setup lang="ts">
import SVG from '../../../assets/SVG.png'
import boutton from '../comom/Boutton.vue';
import { Search, User, ShoppingBag } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import { useOrder } from '@/presentation/stores/useOrder.ts';

const orderStore = useOrder();
const titre = 'Order now';
</script>

<template>
  <div class="w-full h-[80px] px-5 sm:px-[25px] lg:px-[50px] box-border flex items-center justify-between bg-white sticky top-0 z-[1000]">

    <div class="flex items-center gap-[10px] min-w-auto lg:min-w-[180px]">
      <div class="w-[42px] h-[42px] lg:w-[30px] lg:h-[30px] flex items-center justify-center rounded-[12px] overflow-hidden">
        <img :src="SVG" alt="SVG" class="w-[42px] h-[42px] lg:w-[20px] lg:h-[20px] object-contain">
      </div>
      <div>
        <p class="m-0 leading-none text-[18px] lg:text-[22px] font-extrabold tracking-[-0.5px]">Foodly</p>
        <p class="m-0 leading-none mt-[5px] text-[7px] lg:text-[9px] font-semibold tracking-[2px] lg:tracking-[3px] text-[#888]">KITCHEN</p>
      </div>
    </div>

    <div class="hidden md:flex items-center gap-[18px] lg:gap-[35px]">
      <RouterLink to="/" class="no-underline">
        <div class="relative text-[14px] lg:text-[15px] font-medium text-[#333] cursor-pointer transition-colors duration-300 hover:text-[#F5BE18] after:absolute after:left-0 after:-bottom-[8px] after:w-0 after:h-[2px] after:bg-[#F5BE18] after:rounded-[10px] hover:after:w-full after:transition-all after:duration-300">
          Home
        </div>
      </RouterLink>
        <div class="relative text-[14px] lg:text-[15px] font-medium text-[#333] cursor-pointer transition-colors duration-300 hover:text-[#F5BE18] after:absolute after:left-0 after:-bottom-[8px] after:w-0 after:h-[2px] after:bg-[#F5BE18] after:rounded-[10px] hover:after:w-full after:transition-all after:duration-300">
          Menu
        </div>
      <div class="relative text-[14px] lg:text-[15px] font-medium text-[#333] cursor-pointer transition-colors duration-300 hover:text-[#F5BE18] after:absolute after:left-0 after:-bottom-[8px] after:w-0 after:h-[2px] after:bg-[#F5BE18] after:rounded-[10px] hover:after:w-full after:transition-all after:duration-300">
        Categorie
      </div>
      <div class="relative text-[14px] lg:text-[15px] font-medium text-[#333] cursor-pointer transition-colors duration-300 hover:text-[#F5BE18] after:absolute after:left-0 after:-bottom-[8px] after:w-0 after:h-[2px] after:bg-[#F5BE18] after:rounded-[10px] hover:after:w-full after:transition-all after:duration-300">
        About
      </div>
      <div class="relative text-[14px] lg:text-[15px] font-medium text-[#333] cursor-pointer transition-colors duration-300 hover:text-[#F5BE18] after:absolute after:left-0 after:-bottom-[8px] after:w-0 after:h-[2px] after:bg-[#F5BE18] after:rounded-[10px] hover:after:w-full after:transition-all after:duration-300">
        Blog
      </div>
      <div class="relative text-[14px] lg:text-[15px] font-medium text-[#333] cursor-pointer transition-colors duration-300 hover:text-[#F5BE18] after:absolute after:left-0 after:-bottom-[8px] after:w-0 after:h-[2px] after:bg-[#F5BE18] after:rounded-[10px] hover:after:w-full after:transition-all after:duration-300">
        Contact
      </div>
    </div>

    <div class="flex items-center gap-[6px] lg:gap-[12px] min-w-auto lg:min-w-[220px] justify-end">
      <div class="w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] flex items-center justify-center rounded-full cursor-pointer text-[#333] bg-[#f7f7f7] hover:bg-[#F5BE18] hover:text-black hover:-translate-y-[2px] transition-all duration-300">
        <User class="w-[19px] h-[19px] stroke-[2]" />
      </div>
      
      <RouterLink to="/orderMenuItem" class="relative w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] flex items-center justify-center rounded-full cursor-pointer text-[#333] bg-[#f7f7f7] no-underline hover:bg-[#F5BE18] hover:text-black hover:-translate-y-[2px] transition-all duration-300">
        <ShoppingBag class="w-[19px] h-[19px] stroke-[2]" />
        <span v-if="orderStore.orderMenuItem.length > 0" class="absolute -top-1 -right-1 bg-[#e85d04] text-white text-[11px] font-bold px-[6px] py-[2px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
          {{ orderStore.orderMenuItem.length }}
        </span>
      </RouterLink>
    </div>
  </div>
</template>