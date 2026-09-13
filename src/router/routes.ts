import { createWebHashHistory,createRouter,createWebHistory,createMemoryHistory } from "vue-router";
import Home from "@/presentation/views/Home.vue";

const routes=[
    {path:'/',component : Home}
]

export const router =createRouter({
      history: createMemoryHistory(),
      routes
})