import { createRouter, createWebHistory } from "vue-router";
import Home from "@/presentation/views/Home.vue";
import OrderMenuItem from "@/presentation/views/OrderMenuItem.vue";
import CreateMenuItem from "@/presentation/views/CreateMenuItem.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/orderMenuItem', component: OrderMenuItem },
    { path: '/menu-item/:id', redirect: '/' },
    {path:'/create-menu-item', component:CreateMenuItem}
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});