import { Room } from "./Room";

export class Hotel {
    id : number;
    name : string;
    latitude : number;
    longitude : number;
    rooms : Room[];

   constructor(id : number, name : string, latitude : number, longitude : number, rooms : Room[]) {
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.rooms = rooms;
   }
}

export class HotelAndDistance {
    hotel : Hotel;
    distance : number;
    
    constructor(hotel : Hotel, distance : number) {
        this.hotel = hotel;
        this.distance = distance;
    }
}