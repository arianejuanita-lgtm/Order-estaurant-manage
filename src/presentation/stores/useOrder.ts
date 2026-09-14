import { ref,computed } from "vue";
import { defineStore } from "pinia";
import { OrderRepository } from "@/data/repositories/OrderRepository";
import { Order } from "@/domain/entities/Order";

const orderRepository=new OrderRepository();

export const useOrder=defineStore("order",()=>{
    const orderMenuItem=ref<Order[]>([]);

   async function fetchOrderMenuItems() {
    try {
        orderMenuItem.value = await orderRepository.getOrderMenuItems();
     console.log("recuperation des orders",orderMenuItem.value);

    } catch (error) {
        console.log("erreur de recuperation des orders",error);
    }
   }

   async function createOrderMenuItem(order:Order) {
    try {
        const created= await orderRepository.addOrderMenuItems(order);
        orderMenuItem.value?.unshift(created);
         console.log("creation des orders",orderMenuItem.value);
    } catch (error) {
          console.log("erreur de la creation des orders",error);
    }
   }

   async function updateOrderMenuItem(order:Order) {
    try {
    const updated = await orderRepository.updateOrderMenuItems(order);
    const index = orderMenuItem.value.findIndex((m) => m.id === updated.id);
    if (index !== -1) {
      orderMenuItem.value[index] = updated;
    }
     console.log("modifications des orders",orderMenuItem.value);
    } catch (error) {
         console.log("erreur de la modification des orders",error);
    }
   }

   async function deleteOrderMenu(id:number) {
    try {
        await orderRepository.deleteOrderMenuItems(id);
        orderMenuItem.value=orderMenuItem.value.filter((item)=>item.id !== id);
         console.log("supression des orders",orderMenuItem.value);
    } catch (error) {
        
    }
   }

   async function allOrders() {
    await fetchOrderMenuItems();
   }

   const addOrder=computed(()=>{});

   return {
    orderMenuItem,
    fetchOrderMenuItems,
    createOrderMenuItem,
    updateOrderMenuItem,
    deleteOrderMenu,
    allOrders,
    addOrder
   }

});