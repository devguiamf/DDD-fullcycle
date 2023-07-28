import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../database/sequelize/model/customer.model";
import ProductModel from "../database/sequelize/model/product.model";
import OrderItemModel from "../database/sequelize/model/order-item";
import OrderModel from "../database/sequelize/model/order.model";

import Customer from "../../domain/entity/costomer";
import Product from "../../domain/entity/peoduct";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";

import Adress from "../../domain/entity/adress";

import CustomerRepository from "./customer.repository";
import ProductRepository from "./product.repository";
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

    sequelize.addModels([
      CustomerModel,
      ProductModel,
      OrderItemModel,
      OrderModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const adress = new Adress("Street 1", 123, "14401386", "City 1");
    customer.changeAdress(adress);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem("1", product.name, product.price, product.id, 2);

    const order = new Order("123", customer.id, [ordemItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total,
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: order.id,
          product_id: product.id
        }
      ]
    })
  });

  it('Should update a specific order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "gui");
    const address = new Adress("Maranhão", 2255, "14401386", "Franca");
    customer.changeAdress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Produto 1", 20);
    await productRepository.create(product);

    const orderItem = new OrderItem("oi1",product.name, product.price, product.id, 2);

    const orderRepository = new OrderRepository();
    const order = new Order("o1", customer.id, [orderItem])
    await orderRepository.create(order)

    const product2 = new Product("p2", "Produto 2", 20);
    await productRepository.create(product2);

    orderItem.changeProduct(product2)

    order.changeItems([orderItem])

    await orderRepository.update(order)

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

    expect(orderModel.toJSON()).toStrictEqual({
        id: order.id,
        customerId: customer.id,
        total: order.total,
        items: [{
          id: orderItem.id,
          name: product2.name,
          price: product2.price,
          productId: product2.id,
          orderId: order.id,
          quantity: orderItem.quantity
        }]
    })
  })

  it('shold find one order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "gui");
    const address = new Adress("Maranhão", 2255, "14401386", "Franca");
    customer.changeAdress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Produto 1", 20);
    const product2 = new Product("p2", "Produto 2", 40);
    
    
    await productRepository.create(product);
    await productRepository.create(product2)

    const orderItem1 = new OrderItem("oi1",product.name, product.price, product.id, 2);
    const orderItem2 = new OrderItem("oi2",product2.name, product2.price, product2.id, 4);

    const orderRepository = new OrderRepository();
    const order = new Order("o1", customer.id, [orderItem1, orderItem2])
    await orderRepository.create(order)

    const orderModel = await orderRepository.find(order.id) 

    expect(orderModel).toStrictEqual(order)
  })

  it('shold find all orders created', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "gui");
    const address = new Adress("Maranhão", 2255, "14401386", "Franca");
    customer.changeAdress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Produto 1", 20);
    const product2 = new Product("p2", "Produto 2", 40);
    await productRepository.create(product);
    await productRepository.create(product2)

    const orderItem1 = new OrderItem("oi1",product.name, product.price, product.id, 2);
    const orderItem2 = new OrderItem("oi2",product2.name, product2.price, product2.id, 4);

    const orderRepository = new OrderRepository();
    const order1 = new Order("o1", customer.id, [orderItem1])
    const order2 = new Order("o2", customer.id, [orderItem2])
    await orderRepository.create(order1)
    await orderRepository.create(order2)

    const orders = [order1, order2]

    const orderModel = await orderRepository.findAll()

    expect(orders).toStrictEqual(orderModel)

  })

});
