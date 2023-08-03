import Adress from "../entity/adress";
import CustomerFactory from "./customer.factory";

describe('Customer factory unit test', () => {

    it("should create a customer", () => {
        const customer = CustomerFactory.create("Jhon")

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jhon");
        expect(customer.adress).toBeUndefined();
    })

    it("should create a customer with an address", () => {
        const adress = new Adress("Rua maranhao", 2255, "14401386", "franca")
        const customer = CustomerFactory.createWithAdress("Jhon", adress)

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jhon");
        expect(customer.adress).toBe(adress);
    })

})