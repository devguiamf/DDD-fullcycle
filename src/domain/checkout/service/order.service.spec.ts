import Customer from "../../customer/entity/costomer"
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import OrderService from "./order.service"

describe("Order service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer("c1", "Guilherme");
        const item1 = new OrderItem("i1", "Item 1", 20, "1", 2);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(20)
        expect(order.total).toBe(40)
    })

    it('should get total of all orders', () => {
        const item1 = new OrderItem("i1","Item 1", 20, "1", 2);
        const item2 = new OrderItem("i2","Item 2", 10, "2", 5);

        const order1 = new Order("o1", "c1", [item1]);
        const order2 = new Order("o2", "c1", [item2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(90);
    })

})