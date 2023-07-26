import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import OrderItemModel from "../database/sequelize/model/order-item";
import OrderModel from "../database/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    console.log(entity);
    
    try {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
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
    OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
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
        },
      }
    );
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ["items"],
    });

    const orderItem = new OrderItem(
      orderModel.items[0].id,
      orderModel.items[0].name,
      orderModel.items[0].price,
      orderModel.items[0].product_id,
      orderModel.items[0].quantity
    )

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      [orderItem]
    );
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ["items"],
    });

    return orderModels.map((orderModel) => {
      const orderItem = new OrderItem(
        orderModel.items[0].id,
        orderModel.items[0].name,
        orderModel.items[0].price,
        orderModel.items[0].product_id,
        orderModel.items[0].quantity
      )

      return new Order(
        orderModel.id,
        orderModel.customer_id,
        [orderItem]
      );
    });
  }
}
