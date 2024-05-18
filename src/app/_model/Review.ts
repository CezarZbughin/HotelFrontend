export class Review  {
    id: number;
    user : number;
    hotel : number;
    rating : number;
    comment : string;

    constructor(id : number , user : number, hotel : number, rating : number, commnet : string) {
        this.id = id;
        this.user = user;
        this.hotel = hotel;
        this.rating = rating;
        this.comment = commnet;
    }
}