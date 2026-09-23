import { createRouter, createWebHistory } from "vue-router";
import Home from "@/presentation/views/Home.vue";
import OrderMenuItem from "@/presentation/views/OrderMenuItem.vue";
import CreateMenuItem from "@/presentation/views/CreateMenuItem.vue";
import Succes from "@/presentation/views/component/createMenuItem/Succes.vue";
import DetailsMenuItem from "@/presentation/views/DetailsMenuItem.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/orderMenuItem', component: OrderMenuItem },
    { path: '/menu-item/:id', redirect: '/' },
    {path:'/create-menu-item', component:CreateMenuItem},
    { path: '/edit-menu-item/:id',component: CreateMenuItem},
    {path:'/sucess', name:'sucess', component:Succes},
    {path:'/detail-menu-item/:id', name:'detail-menu-item', component:DetailsMenuItem , props:true}

];

export const router = createRouter({
    history: createWebHistory(),
    routes
});