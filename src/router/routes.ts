import { createRouter, createWebHistory } from "vue-router";
import Home from "@/presentation/views/Home.vue";
import OrderMenuItem from "@/presentation/views/OrderMenuItem.vue";
import CreateMenuItem from "@/presentation/views/CreateMenuItem.vue";
import Succes from "@/presentation/views/component/createMenuItem/Succes.vue";
import DetailsMenuItem from "@/presentation/views/DetailsMenuItem.vue";
import HomeView from "@/presentation/views/HomeView.vue";
import CategoryView from "@/presentation/views/CategoryView.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/home', component: Home },
    { path: '/orderMenuItem', component: OrderMenuItem },
    { path: '/menu-item/:id', redirect: '/' },
    {path:'/create-menu-item', component:CreateMenuItem},
    { path: '/edit-menu-item/:id',component: CreateMenuItem},
    {path:'/sucess', name:'sucess', component:Succes},
    {path:'/detail-menu-item/:id', name:'detail-menu-item', component:DetailsMenuItem , props:true},
    {path:'/categorie',component:CategoryView}

];

export const router = createRouter({
    history: createWebHistory(),
    routes
});