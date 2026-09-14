import { apiClient } from "../datasources/apiClient";
import { Order } from "@/domain/entities/Order";

export interface IOrderMenuItems {
  getOrderMenuItems(): Promise<Order[]>;
  addOrderMenuItems(order: Order): Promise<Order>;
  updateOrderMenuItems(order: Order): Promise<Order>;
  deleteOrderMenuItems(id: number): Promise<void>;
}

export class OrderRepository implements IOrderMenuItems {
  async getOrderMenuItems(): Promise<Order[]> {
    const response = await apiClient.get("");
    const order = response.data.record.orders;

    return order.map(
      (x: any) =>
        new Order({
          id: x.id,
          items: x.items,
          totalPrice: x.totalPrice,
          status: x.status,
          createdAt: x.createdAt,
        }),
    );
  }

  async addOrderMenuItems(order: Order): Promise<Order> {
    const response = await apiClient.get("");
    const currentData= response.data.record;
    const existingOrders=currentData.orders || [];

    const updatedOrder=[
        ...existingOrders,
        order.toJSON()
    ];

    await apiClient.put("",{
        ...currentData,
        orders:updatedOrder
    });

    return order;
  }

  async updateOrderMenuItems(order: Order): Promise<Order> {

    const getResponse = await apiClient.get("");
    const currentData = getResponse.data.record;
    const existingOrders = currentData.orders || [];

    const updatedOrders = existingOrders.map((item: any) => 
      item.id === order.id ? order.toJSON() : item
    );

    await apiClient.put("", {
      ...currentData,
      orders: updatedOrders
    });

    return order;
  }

  async deleteOrderMenuItems(id: number): Promise<void> {
    const getResponse = await apiClient.get("");
    const currentData = getResponse.data.record;
    const existingOrders = currentData.orders || [];

    const updatedOrders = existingOrders.filter((item: any) => item.id !== id);

    await apiClient.put("", {
      ...currentData,
      orders: updatedOrders
    });
  }
}
