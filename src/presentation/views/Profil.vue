<script setup lang="ts">
import { ref } from 'vue';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Bell, 
  Lock, 
  LogOut, 
  Edit3, 
  ShoppingBag, 
  Heart 
} from 'lucide-vue-next';
import HeaderProfil from './component/Profil/headerProfil.vue';
import ProfilCard from './component/Profil/ProfilCard.vue';
import StatsProfil from './component/Profil/StatsProfil.vue';
import PersonalProfil from './component/Profil/PersonalProfil.vue';
import AccountProfil from './component/Profil/AccountProfil.vue';
import ariane from '../../assets/ariane.jpeg'

export interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  avatar: string;
  [key: string]: string; 
}

interface StatItem {
  label: string;
  value: string | number;
  icon: any;
}

withDefaults(defineProps<{
  user?: UserData;
  stats?: StatItem[];
  editable?: boolean;
}>(), {
  user: () => ({
    name: 'Ariane Juanita',
    email: 'ariane.ateumo@example.com',
    phone: '+237 600 000 000',
    location: 'Douala, Cameroon',
    role: 'Administrator / Project Manager',
    avatar: ariane,
  }),
  stats: () => [
    { label: 'Total Orders', value: '48', icon: ShoppingBag },
    { label: 'Favorite Dishes', value: '12', icon: Heart },
    { label: 'Reviews', value: '24', icon: ShieldCheck },
  ],
  editable: true,
});

const emit = defineEmits<{
  (e: 'update:user', user: UserData): void;
  (e: 'logout'): void;
  (e: 'change-password'): void;
}>();

const isEditing = ref(false);

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const profileFields = [
  { key: 'name', label: 'Full Name', type: 'text', icon: User },
  { key: 'email', label: 'Email Address', type: 'email', icon: Mail },
  { key: 'phone', label: 'Phone Number', type: 'text', icon: Phone },
  { key: 'location', label: 'Location', type: 'text', icon: MapPin },
];
</script>

<template>
  <div class="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
    <div class="max-w-5xl mx-auto space-y-6">
      
       <HeaderProfil :isEditing="isEditing" :toggleEdit="toggleEdit" :editable="editable"/>
     

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="space-y-6">
           <ProfilCard :avatar="user.avatar" :name="user.name" :role="user.role" :location="user.location"/>
      

           <StatsProfil :stats="stats"/>
         
        </div>

        <div class="lg:col-span-2 space-y-6">
          
           <PersonalProfil :profileFields="profileFields" :isEditing="isEditing" :user="user" />
       

           <AccountProfil/>
          

        </div>

      </div>

    </div>
  </div>
</template>