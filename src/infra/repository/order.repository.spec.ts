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
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([CustomerModel, OrderItemModel, OrderModel, ProductModel]);
        await sequelize.sync();
    });


    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a order ", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const adress = new Adress("Street 1", 123, "14401386", "City 1");
        customer.changeAdress(adress);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"]
        });

        console.log(orderModel.toJSON());
        

        // expect(orderModel.toJSON()).toStrictEqual({
        //     id: "1",
        //     customer_id: customer.id,
        //     total: order.total(),
        //     items: [{
        //         id: orderItem.id,
        //         name: orderItem.name,
        //         price: orderItem.price,
        //         quantity: orderItem.quantity,
        //         order_id: "1",
        //     }]
        // })
    })
});