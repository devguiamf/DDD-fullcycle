import Product from "./product";

describe("Order unit test ", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            
            const product = new Product("", "Products 1", 100);
        
        }).toThrowError("ID is required")
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            
            const product = new Product("1", "", 100);
        
        }).toThrowError("Name is required")
    })

    it("should throw error when price is required", () => {
        expect(() => {
            
            const product = new Product("1", "Produto 1", 0);
        
        }).toThrowError("Price is required")
    })

    it("should change name", () => {
        
        const product = new Product("1", "Produto 1", 10);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    })

    it("should change price", () => {
        
        const product = new Product("1", "Produto 1", 10);
        product.changePrice(50);
        expect(product.price).toBe(50);
    })

})