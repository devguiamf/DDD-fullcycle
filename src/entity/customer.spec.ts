import Adress from "./adress";
import Customer from "./costomer";

describe("Cutomer unit tests", () => {
    it("should throw error when id is empty", () => {

        expect(() => {
            let customer = new Customer("", "Jhon");
        }).toThrowError("ID is required")

    });

    it("should throw error when name is empty", () => {

        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required")

    });

    it("should activate cutomer", () => {
        let customer = new Customer("1", "Customer 1");
        const adress = new Adress("Rua 1", 123, "14401386", "Franca")
        customer.Adress = adress
        expect(customer.isActive()).toBe(true)
    });

    it("should deactivate cutomer", () => {
        let customer = new Customer("1", "Customer 1");
        customer.desactivate();
        expect(customer.isActive()).toBe(false)
    });

    it("should throw eror when adress is undefined when you activate a cutumer", () => {

        expect(() => {

            let customer = new Customer("1", "Customer 1");
            customer.ativate();
        }).toThrowError("Adress is mandatory to activate a customer")

        
    });
})