export class ReservationRoom {
    id : number;
    room: number;
    reservation: number;
    constructor(id : number, room : number, resevation: number) {
        this.id = id;
        this.room = room;
        this.reservation = resevation;
    }
}


export class Reservation {
    id : number;
    user: number;
    rooms : ReservationRoom[];
    startDate : string;
    endDate : string;

    constructor(id: number, user : number, rooms: ReservationRoom[], startDate: string, endDate: string) {
        this.id = id;
        this.user = user;
        this.rooms = rooms;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}