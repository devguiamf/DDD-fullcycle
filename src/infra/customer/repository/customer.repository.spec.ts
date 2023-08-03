import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../repository/sequelize/customer.model";
import Customer from "../../../domain/customer/entity/costomer";
import CustomerRepository from "./customer.repository";
import Adress from "../../../domain/customer/entity/adress";

describe("Customer repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });


    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a customer ", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const adress = new Adress("Street 1", 123, "14401386", "City 1");
        customer.changeAdress(adress);
        await customerRepository.create(customer);
        
        const customerModel = await CustomerModel.findOne({where: {id: "1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            zipcode: adress.zipcode,
            city: adress.city,
            active: customer.isActive(),
            street: adress.street,
            number: adress.number,
            rewardPoints: customer.rewardPoints
        });
    })


    it("should find a customer ", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const adress = new Adress("Maranhao", 2255, "14401386", "Franca");
        customer.changeAdress(adress);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id: "1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: adress.street,
            number: adress.number,
            zipcode: adress.zipcode,
            city: adress.city,
            rewardPoints: customer.rewardPoints,
            active: customer.isActive()
        });
    });

    it("should find all customers ", async () => {
        const cutomerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "Customer 1");
        const adress1 = new Adress("Maranhao", 2255, "14401386", "Franca");
        customer1.changeAdress(adress1);

        const customer2 = new Customer("2", "Customer 2");
        const adress2 = new Adress("São luis", 120, "14411389", "Ribeirão Preto");
        customer2.changeAdress(adress2);

        await cutomerRepository.create(customer1);
        await cutomerRepository.create(customer2);
        
        const customers = await cutomerRepository.findAll();

        const customersArray = [customer1, customer2];

        expect(customers).toStrictEqual(customersArray);
    })

    it("should update a cutomer ", async () => {
        const cutomerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const adress = new Adress("Maranhao", 2255, "14401386", "Franca");
        customer.changeAdress(adress);
        await cutomerRepository.create(customer);

        customer.changeName("Customer 2");
        await cutomerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({where: {id: customer.id}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: adress.street,
            number: adress.number,
            zipcode: adress.zipcode,
            city: adress.city,
            rewardPoints: customer.rewardPoints,
            active: customer.isActive()
        });
    })

    it("shold throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("1123sd")
        }).rejects.toThrow("Customer not found")
    })

});