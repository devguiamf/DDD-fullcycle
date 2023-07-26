import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../database/sequelize/model/customer.model";
import Customer from "../../domain/entity/costomer";
import CustomerRepository from "./customer.repository";
import Adress from "../../domain/entity/adress";
import OrderItemModel from "../database/sequelize/model/order-item";
import OrderModel from "../database/sequelize/model/order.model";
import ProductModel from "../database/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/peoduct";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: true,
        sync: { force: true },
      });
  
      sequelize.addModels([CustomerModel, OrderItemModel, OrderModel, ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
  
    it('should create a new order', async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("123", "John Doe");
      const address = new Adress("Street 1", 1, "Zipcode", "City 1");
      customer.changeAdress(address);
      await customerRepository.create(customer);
  
      const productRepository = new ProductRepository();
      const product = new Product("1234", "Product 1", 10);
      await productRepository.create(product);
  
      const ordemItem = new OrderItem("1", product.name, product.price, product.id, 2);
  
      const order = new Order("123", "123", [ordemItem]);
  
      const orderRepository = new OrderRepository();
      await orderRepository.create(order);
  
      const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

      console.log(orderModel);
      
        
      expect(orderModel.toJSON()).toStrictEqual({
        id: "123",
        customer_id: "123",
        total: order.total(),
        items: [
          {
            id: ordemItem.id,
            name: ordemItem.name,
            price: ordemItem.price,
            quantity: ordemItem.quantity,
            order_id: "123",
            product_id: "1234"
          }
        ]
      })

   
    });
  
  });