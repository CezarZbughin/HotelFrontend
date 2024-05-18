export class Room  {
    id: number;
    hotel : number;
    roomNumber : number;
    type : number;
    price : number;
    available : boolean;

    constructor(id : number , hotel : number, roomNumber : number, type : number, price : number, available : boolean) {
        this.id = id;
        this.hotel = hotel;
        this.roomNumber = roomNumber;
        this.type = type;
        this.price = price;
        this.available = available;
    }
}