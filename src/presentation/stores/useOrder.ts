import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { OrderRepository } from "@/data/repositories/OrderRepository";
import { Order } from "@/domain/entities/Order";

const orderRepository = new OrderRepository();

export const useOrder = defineStore("order", () => {
    const orderMenuItem = ref<Order[]>([]);

    async function fetchOrderMenuItems() {
        try {
            orderMenuItem.value = await orderRepository.getOrderMenuItems();
        } catch (error) {
            console.log("erreur de recuperation des orders", error);
        }
    }

    async function createOrderMenuItem(order: Order) {
        try {
            const created = await orderRepository.addOrderMenuItems(order);
            orderMenuItem.value.unshift(created);
        } catch (error) {
            console.log("erreur de la creation des orders", error);
        }
    }

    async function updateOrderMenuItem(order: Order) {
        try {
            const updated = await orderRepository.updateOrderMenuItems(order);
            const index = orderMenuItem.value.findIndex((m) => m.id === updated.id);
            if (index !== -1) {
                orderMenuItem.value[index] = updated;
            }
        } catch (error) {
            console.log("erreur de la modification des orders", error);
        }
    }

    async function deleteOrderMenu(id: number) {
        try {
            await orderRepository.deleteOrderMenuItems(id);
            orderMenuItem.value = orderMenuItem.value.filter((item) => item.id !== id);
        } catch (error) {
            console.log("erreur de la suppression des orders", error);
        }
    }

    function addOrder(order: Order) {
        orderMenuItem.value.unshift(order);
    }

    function addItemToOrder(menuItem: { id: number; name: string; price: number; portionSizes: string[] }) {
        const existingOrder = orderMenuItem.value.find(ord => 
            ord.items.some(i => i.menuItemId === menuItem.id)
        );

        if (existingOrder) {
            const existingItem = existingOrder.items.find(i => i.menuItemId === menuItem.id);
            if (existingItem) {
                existingItem.quantity++;
                existingOrder.totalPrice = existingItem.price * existingItem.quantity;
            }
        } else {
            const newOrder = new Order({
                id: orderMenuItem.value.length + 1,
                items: [{
                    menuItemId: menuItem.id,
                    name: menuItem.name,
                    price: menuItem.price,
                    quantity: 1,
                    portionSize: menuItem.portionSizes[0] || ''
                }],
                totalPrice: menuItem.price,
                status: 'pending',
                createdAt: new Date().toISOString()
            });
            orderMenuItem.value.unshift(newOrder);
        }
    }

    function incrementItemQuantity(menuItemId: number) {
        const order = orderMenuItem.value.find(ord => ord.items.some(i => i.menuItemId === menuItemId));
        if (order) {
            const item = order.items.find(i => i.menuItemId === menuItemId);
            if (item) {
                item.quantity++;
                order.totalPrice = order.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
            }
        }
    }

    function decrementItemQuantity(menuItemId: number) {
        const order = orderMenuItem.value.find(ord => ord.items.some(i => i.menuItemId === menuItemId));
        if (order) {
            const item = order.items.find(i => i.menuItemId === menuItemId);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                    order.totalPrice = order.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
                } else {
                    deleteOrderMenu(order.id!);
                }
            }
        }
    }

    return {
        orderMenuItem,
        fetchOrderMenuItems,
        createOrderMenuItem,
        updateOrderMenuItem,
        deleteOrderMenu,
        addOrder,
        addItemToOrder,
        incrementItemQuantity,
        decrementItemQuantity
    };
});