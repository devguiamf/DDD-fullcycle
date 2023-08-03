import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";
import EventDispathcerInterface from "./event-dispathcer.interface";

export default class EventDispathcer implements EventDispathcerInterface{

    private eventHandlers: {[eventName: string]: EventHandlerInterface[]} = {}

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[]} {
        return this.eventHandlers;
    }

    notify(event: EventInterface): void {
            const eventName = event.constructor.name;
            if(this.eventHandlers[eventName]){
                this.eventHandlers[eventName].forEach((eventhandler) => {
                    eventhandler.handle(event)
                })
            }
    }

    register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if(!this.eventHandlers[eventName]){
            this.eventHandlers[eventName] = []
        }
        this.eventHandlers[eventName].push(eventHandler)
    }
    unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if(this.eventHandlers[eventName]){
            const index = this.eventHandlers[eventName].indexOf(eventHandler);
            if(index !== -1){
                this.eventHandlers[eventName].splice(index, 1)
            }
        }
    }
    unregisterAll(): void {
        this.eventHandlers = {}
    }

}