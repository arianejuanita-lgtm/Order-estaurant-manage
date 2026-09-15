import { createRouter, createWebHistory } from "vue-router";
import Home from "@/presentation/views/Home.vue";
import AddMenuItem from "@/presentation/views/AddMenuItem.vue";
import Update from "@/presentation/views/Update.vue";
import OrderMenuItem from "@/presentation/views/OrderMenuItem.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/addMenuItem', component: AddMenuItem },
    { path: '/updateMenuItem/:id', component: Update },
    { path: '/orderMenuItem', component: OrderMenuItem }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});