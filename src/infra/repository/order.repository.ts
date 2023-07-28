import { where } from "sequelize";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import OrderItemModel from "../database/sequelize/model/order-item";
import OrderModel from "../database/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    try {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total,
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          include: [{ model: OrderItemModel }],
        }
      );
    } catch (error) {
      console.log(error);
      throw new Error("Error to create order");
    }
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total,
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id,
        }
      }
    );
  }
  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: {id},
      include: {model: OrderItemModel}
    })
    let items: OrderItem[] = []

    orderModel.items.forEach((item) => {
      let order = new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      )
      items.push(order) 
    })
    
    const order = new Order(orderModel.id, orderModel.customer_id, items)
    return order
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({include: {model: OrderItemModel}})
    const orders = ordersModel.map((res) => {
       let orderItem = new OrderItem(res.items.id, res.items.name, res.items[i].price, res.items[i].product_id, res.items[i].quantity)
       let order = new Order(res., res.customer_id, [orderItem])
       return order
    })
    return orders
  }
}
