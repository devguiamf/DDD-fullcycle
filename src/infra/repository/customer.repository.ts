import Adress from "../../domain/entity/adress";
import Customer from "../../domain/entity/costomer";
import CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface";
import CustomerModel from "../database/sequelize/model/customer.model";
import OrderItemModel from "../database/sequelize/model/order-item";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    try {
      await CustomerModel.create({
        id: entity.id,
        name: entity.name,
        street: entity.adress.street,
        number: entity.adress.number,
        zipcode: entity.adress.zipcode,
        city: entity.adress.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      });
    } catch (error: any) {
      console.error(error);
      throw new Error("Error to create customer");
    }
  }
  async update(entity: Customer): Promise<void> {
    CustomerModel.update(
      {
        name: entity.name,
        street: entity.adress.street,
        zipcode: entity.adress.zipcode,
        city: entity.adress.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(id, customerModel.name);
    const adress = new Adress(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city
    );
    customer.changeAdress(adress);
    return customer;
  }
  async findAll(): Promise<Customer[]> {
    const CustomerModels = await CustomerModel.findAll();
    const customers = CustomerModels.map((customerModel) => {
      let customer = new Customer(customerModel.id, customerModel.name);
      customer.addRewardPoints(customerModel.rewardPoints);
      const address = new Adress(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city
      );
      customer.changeAdress(address);
      if (customerModel.active) {
        customer.ativate();
      }
      return customer;
    });
    return customers;
  }
}
