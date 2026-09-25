<script setup lang="ts">
import Restaurant from '../../../assets/Restaurant.png';
import HeaderIconButton from '../comom/HeaderIconButton.vue'; 
import { Search, User, ShoppingBag, Menu as MenuIcon, X } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import { useOrder } from '@/presentation/stores/useOrder.ts';
import { ref, onMounted, onUnmounted } from 'vue';

const orderStore = useOrder();
const isMobileMenuOpen = ref<boolean>(false);
const menuContainerRef = ref<HTMLElement | null>(null);

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/home' },
  { name: 'Category', path: '/categorie' },
  // { name: 'About', path: '/about' },
  // { name: 'Blog', path: '/blog' },
  // { name: 'Contact', path: '/contact' },
];

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (menuContainerRef.value && !menuContainerRef.value.contains(event.target as Node)) {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="w-full h-[80px] px-5 sm:px-[25px] lg:px-[50px] box-border flex items-center justify-between bg-white sticky top-0 z-[1000]">

    <RouterLink to="/" class="no-underline">
      <div class="flex items-center gap-[10px] min-w-auto lg:min-w-[180px]">
        <div class="w-[42px] h-[42px] lg:w-[30px] lg:h-[30px] flex items-center justify-center rounded-[12px] overflow-hidden">
          <img :src="Restaurant" alt="Restaurant" class="w-[42px] h-[42px] lg:w-[20px] lg:h-[20px] object-contain">
        </div>
        <div>
          <p class="m-0 leading-none text-[18px] lg:text-[22px] font-extrabold tracking-[-0.5px]">Foodly</p>
          <p class="m-0 leading-none mt-[5px] text-[7px] lg:text-[9px] font-semibold tracking-[2px] lg:tracking-[3px] text-[#888]">KITCHEN</p>
        </div>
      </div>
    </RouterLink>

    <div class="hidden md:flex items-center gap-[18px] lg:gap-[35px]">
      <div 
        v-for="link in navLinks" 
        :key="link.name"
        class="relative text-[14px] lg:text-[15px] font-medium text-[#333] cursor-pointer transition-colors duration-300 hover:text-[#F5BE18] after:absolute after:left-0 after:-bottom-[8px] after:w-0 after:h-[2px] after:bg-[#F5BE18] after:rounded-[10px] hover:after:w-full after:transition-all after:duration-300"
      ><RouterLink :to="link.path">
        {{ link.name }}</RouterLink>
      </div>
    </div>

    <div class="flex items-center gap-[6px] lg:gap-[12px] min-w-auto lg:min-w-[220px] justify-end">
      <RouterLink to="/profil"> <HeaderIconButton :icon="User" label="User profile" /></RouterLink>
      <RouterLink to="/orderMenuItem" class="no-underline">
        <HeaderIconButton 
          :icon="ShoppingBag" 
          :badge-count="orderStore.orderMenuItem.length" 
          label="Shopping cart" 
        />
      </RouterLink>

      <div ref="menuContainerRef" class="relative md:hidden">
        <button
          @click.stop="toggleMobileMenu"
          class="w-[36px] h-[36px] flex items-center justify-center rounded-full cursor-pointer text-[#333] bg-[#f7f7f7] hover:bg-[#F5BE18] hover:text-black transition-all duration-300 border-none"
          aria-label="Menu"
        >
          <X v-if="isMobileMenuOpen" class="w-[19px] h-[19px] stroke-[2]" />
          <MenuIcon v-else class="w-[19px] h-[19px] stroke-[2]" />
        </button>

        <div
          v-if="isMobileMenuOpen"
          class="absolute right-0 top-[45px] w-[180px] bg-white border border-gray-100 rounded-2xl shadow-xl p-4 flex flex-col gap-3 z-50 animate-fadeIn"
        >
          <div 
            v-for="link in navLinks" 
            :key="link.name"
            @click="isMobileMenuOpen = false" 
            class="text-[14px] font-medium text-[#333] cursor-pointer hover:text-[#F5BE18] transition-colors"
          ><RouterLink :to="link.path">
            {{ link.name }}</RouterLink>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>