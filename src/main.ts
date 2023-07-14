import Adress from "./entity/adress";
import Customer from "./entity/costomer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "Guilherme")
let adress = new Adress("Rua 1", 1, "14401-386", "São Paulo")
customer.Adress = adress;
customer.ativate()

// const item1 = new OrderItem("1", "item 1", 10)
// const item2 = new OrderItem("1", "item 1", 15)

// const order = new Order("1", "123", [item1, item2])