import { createWebHashHistory,createRouter,createWebHistory,createMemoryHistory } from "vue-router";
import Home from "@/presentation/views/Home.vue";
import AddMenuItem from "@/presentation/views/AddMenuItem.vue";
import UpdateMenuitem from "@/presentation/views/updateMenuitem.vue";
import OrderMenuItem from "@/presentation/views/OrderMenuItem.vue";
const routes=[
    {path:'/',component : Home},
    {path:'/addMenuItem',component:AddMenuItem},
    {path:'/updateMenuItem', component:UpdateMenuitem},
    {path:'/orderMenuItem', component:OrderMenuItem}
]

export const router =createRouter({
      history: createMemoryHistory(),
      routes
})