import Order from "./order"
import OrderItem from "./order_item";

describe("Order unit test ", () => {
        it("should throw error when id is empty", () => {
            expect(() => {
                let order = new Order("", "123", []);
            }).toThrowError("ID is required")
        })

        it("should throw error when custumer id is empty", () => {
            expect(() => {
                let order = new Order("123", "", []);
            }).toThrowError("CustumerId is required")
        })

        it("should throw error when custumer id is empty", () => {
            expect(() => {
                let order = new Order("123", "321", []);
            }).toThrowError("Items are required")
        })

        it("should calculate total", () => {
            const item = new OrderItem("i1", "Item 1", 80, 'p1', 2);
            const item2 = new OrderItem("i2", "Item 2", 120, 'p2', 5);
            const order = new Order("o1","c1",[item])
            let total = order.total();

            expect(total).toBe(160);

            const order2 = new Order("2","1", [item, item2])

            total = order2.total()

            expect(total).toBe(760)

        })

        it("hould throw error if the item qtd is less than 0", () => {

            expect(() => {
                const item = new OrderItem("i1", "Item 1", 80, 'p1', 0);
                const order = new Order("o1","c1",[item])
            }).toThrowError("Quantity must be grater than 0")
        })
})