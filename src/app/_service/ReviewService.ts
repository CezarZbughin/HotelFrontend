import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Hotel } from "../_model/Hotel";
import { Review } from "../_model/Review";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    constructor(
        private http: HttpClient
    ) { }

    url = "http://localhost:8080/api/v1/review";

    getReviews(hotel: Hotel) : Observable<Review[]>{
        return this.http.get<Review[]>(`${this.url}/hotel/${hotel.id}`);
    }

    makeReview(hotel: Hotel, rating: number, comment: string): Observable<any> {
        let body = {
            hotelId: hotel.id,
            rating: 5,
            comment: comment
        }
        return this.http.post<any>(this.url, body,
            { headers: new HttpHeaders({ 'Authorization': this.makeAuthHeader() }) });
    }

    private makeAuthHeader(): string {
        return 'Bearer ' + sessionStorage.getItem("token") ?? "";
    }
}