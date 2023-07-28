import Customer from "../../domain/entity/costomer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import { v4 as uuid} from "uuid"

export default class OrderService {

    static placeOrder(custumer: Customer, items: OrderItem[]): Order {
        if(items.length === 0){Order
            throw new Error("Order must have at least one item")
        }

        const order1 = new Order(uuid(), custumer.id, items)
        custumer.addRewardPoints(order1.total / 2)
        return order1
    }
    
    static total(orders: Order[]): number {
        return orders.reduce((acc,order) => acc + order.total, 0)
    }
}