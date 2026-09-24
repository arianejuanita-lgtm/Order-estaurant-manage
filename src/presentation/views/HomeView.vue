<script setup lang="ts">
import { useRouter } from 'vue-router';
import { UtensilsCrossed, Clock, MapPin, Phone, Star, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-vue-next';
import Boutton from './comom/Boutton.vue';
import InfoCard from './comom/InfoCard.vue';

const router = useRouter();

const goToMenu = () => {
  router.push('/home'); 
};


const infoCards = [
  {
    icon: Clock,
    title: "Opening Hours",
    description: "Monday - Saturday: 08:00 AM - 11:00 PM\nSunday: 10:00 AM - 10:00 PM"
  },
  {
    icon: MapPin,
    title: "Our Location",
    description: "123 Flavor Avenue\nResidential District, Douala"
  },
  {
    icon: Phone,
    title: "Reservations & Contact",
    description: "Phone: +237 600 000 000\nEmail: contact@foodly.com"
  }
];

const features = [
  {
    icon: ShieldCheck,
    title: "100% Fresh Ingredients",
    description: "Strictly selected from our trusted local partner producers."
  },
  {
    icon: Heart,
    title: "Homemade with Love",
    description: "Every single dish is freshly prepared upon order with authentic craftsmanship."
  },
  {
    icon: Star,
    title: "Cozy Atmosphere",
    description: "A warm, fast, and attentive service tailored for your ultimate dining experience."
  }
];
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">

    <section class="relative bg-gradient-to-b from-amber-50/60 via-white to-gray-50 py-16 px-6 sm:px-12 flex flex-col items-center text-center overflow-hidden border-b border-gray-100">
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="max-w-3xl z-10 flex flex-col items-center gap-4">
        <span class="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xs">
          <Sparkles class="w-3.5 h-3.5 text-amber-400" />
          Welcome to Foodly KITCHEN
        </span>

        <h2 class="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          The art of fine dining, <span class="text-amber-400">crafted with passion</span>
        </h2>

        <p class="text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
          Discover a warm environment and homemade meals prepared daily using fresh, local ingredients. A unique culinary experience designed just for you.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-3 mt-4">
          <button 
            @click="goToMenu"
            class="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            Explore Our Menu
            <ArrowRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>

    <section class="max-w-7xl w-full mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <InfoCard 
        v-for="(card, index) in infoCards" 
        :key="index"
        :icon="card.icon"
        :title="card.title"
        :description="card.description"
      />
    </section>

    <section class="max-w-7xl w-full mx-auto px-6 py-8 flex flex-col gap-6">
      <div class="text-center flex flex-col gap-2">
        <h3 class="text-xl font-black text-gray-900">Why Our Customers Love Us</h3>
        <p class="text-xs text-gray-500">Our commitment to quality at the heart of our kitchen</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col items-center text-center gap-3 transition-all hover:shadow-md"
        >
          <div class="w-12 h-12 rounded-full bg-amber-100 text-amber-400 flex items-center justify-center">
            <component :is="feature.icon" class="w-6 h-6" />
          </div>
          <h4 class="text-sm font-bold text-gray-900">{{ feature.title }}</h4>
          <p class="text-xs text-gray-500 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <footer class="mt-auto bg-white border-t border-gray-100 py-6 text-center text-xs text-gray-400">
      <p>© 2026 Foodly Restaurant. All rights reserved.</p>
    </footer>

  </div>
</template>