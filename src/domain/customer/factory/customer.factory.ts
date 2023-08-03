import Adress from "../entity/adress";
import Customer from "../entity/costomer";
import {v4 as uuid} from 'uuid'

export default class CustomerFactory {
    public static create(name: string): Customer{
        return new Customer(uuid(), name )
    }

    public static createWithAdress(name: string, adress: Adress): Customer{
        const customer = new Customer(uuid(), name )
        customer.changeAdress(adress)
        return customer
    }

    
}