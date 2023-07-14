import Adress from "./adress";

export default class Customer {

    private _id: string;
    private _name: string;
    private _adress!: Adress;
    private _active: boolean = true;

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;
        this.validate()
    }

    get name(): string{
        return this._name
    }

    isActive(): boolean{
        return this._active
        
    }

    validate(){
        if(this._name.length === 0){
            throw new Error("Name is required")
        }
        if(this._id.length === 0){
            throw new Error("ID is required")
        }
    }
 
    changeName(name: string){
        this._name = name
    }

    ativate() {
        if(this._adress === undefined){
            throw new Error("Adress is mandatory to activate a customer")
        }
        this._active = true
        
    }

    desactivate(){
        this._active = false
    }

    set Adress(adress: Adress){
        this._adress = adress
    }
}