import { createWebHashHistory,createRouter,createWebHistory,createMemoryHistory } from "vue-router";
import Home from "@/presentation/views/Home.vue";
import AddMenuItem from "@/presentation/views/AddMenuItem.vue";

const routes=[
    {path:'/',component : Home},
    {path:'/addMenuItem',component:AddMenuItem}
]

export const router =createRouter({
      history: createMemoryHistory(),
      routes
})