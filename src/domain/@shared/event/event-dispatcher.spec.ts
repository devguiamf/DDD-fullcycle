import handlerOne from "../../customer/event/handler/handler1.events";
import handlerTwo from "../../customer/event/handler/handler2.events";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispathcer from "./event-dispatcher";

describe("Domain events tests", () => {

    it('should register an event handler of products', () => {
        const eventDispathcer = new EventDispathcer();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispathcer.register("ProductCreatedEvent", eventHandler);
        console.log(eventDispathcer.getEventHandlers);
        
        expect(eventDispathcer.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispathcer.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispathcer.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)
    })

    it('should register an event handler of customer', () => {
        const eventDispathcer = new EventDispathcer();
        const eventHandler1 = new handlerOne();
        const eventHandler2 = new handlerTwo();

        eventDispathcer.register("CustomerCreatedEvent", eventHandler1);
        eventDispathcer.register("CustomerCreatedEvent", eventHandler2);
        
        expect(eventDispathcer.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispathcer.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispathcer.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1)
        expect(eventDispathcer.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2)
    })

    it("shuld unregister an event hancler of products", () => {

        const eventDispathcer = new EventDispathcer();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispathcer.register("ProductCreatedEvent", eventHandler);

        expect(eventDispathcer.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

        eventDispathcer.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispathcer.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispathcer.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    })

    it("shuld unregister an event hancler of customer", () => {

        const eventDispathcer = new EventDispathcer();
        const eventHandler1 = new handlerOne();
        const eventHandler2 = new handlerTwo();      

        eventDispathcer.register("CustomerCreatedEvent", eventHandler1);
        eventDispathcer.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispathcer.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1)
        expect(eventDispathcer.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2)

        eventDispathcer.unregister("CustomerCreatedEvent", eventHandler1);
        eventDispathcer.unregister("CustomerCreatedEvent", eventHandler2);

        expect(eventDispathcer.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispathcer.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
    })

    it('should unregister all events handlers', () => {
        const eventDispathcer = new EventDispathcer();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispathcer.register("ProductCreatedEvent", eventHandler);

        expect(eventDispathcer.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

        eventDispathcer.unregisterAll();

        expect(eventDispathcer.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    })

    it('should notify all events handlers', () =>{
        const eventDispathcer = new EventDispathcer();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispathcer.register("ProductCreatedEvent", eventHandler);
        const spyEventhandler = jest.spyOn(eventHandler, "handle");

        expect(eventDispathcer.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

        const productCreatedEvent = new ProductCreatedEvent({
            name: 'Product 1',
            description: 'Product 1 description',
            price: 50.99
        })

        eventDispathcer.notify(productCreatedEvent)

        expect(spyEventhandler).toHaveBeenCalled();
    })



})