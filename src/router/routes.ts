import { createRouter, createWebHistory } from "vue-router";
import Home from "@/presentation/views/Home.vue";
import OrderMenuItem from "@/presentation/views/OrderMenuItem.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/orderMenuItem', component: OrderMenuItem }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});