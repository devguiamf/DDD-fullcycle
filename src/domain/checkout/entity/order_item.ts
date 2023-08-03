import Product from "../../product/entity/product";

export default class OrderItem {
    private _id: string;
    private _name: string;
    private _price: number;
    private _productId: string;
    private _quantity: number;

    constructor(id: string, name: string, price: number, productId: string, quantity: number){
        this._id = id
        this._price = price
        this._name = name
        this._productId = productId
        this._quantity = quantity
    }

    get price(){
        return this._price
    }

    get quantity(): number{
        return this._quantity
    }

    get name(): string{
        return this._name
    }

    get id(): string{
        return this._id
    }

    get productId(): string{
        return this._productId
    }

    set changeQuantity(quantity: number){
        this._quantity = quantity
    }

    changeProduct(product: Product){
        this._name = product.name;
        this._price = product.price;
        this._productId = product.id
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
      }
}