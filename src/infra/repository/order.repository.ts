import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import OrderItemModel from "../database/sequelize/model/order-item";
import OrderModel from "../database/sequelize/model/order.model";

export default class OrderRepository {
    async create(entity: Order): Promise<void> {
        OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            }))
        },
            {
                include: [{model: OrderItemModel}]
            }
        )
    }

    async update(entity: Order): Promise<void> {

    }
}