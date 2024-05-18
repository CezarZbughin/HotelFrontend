import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Hotel, HotelAndDistance } from "../_model/Hotel";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class HotelService {
    constructor(
        private http : HttpClient
    ) {}

    url = "http://localhost:8080/api/v1/hotel";

    getAllHotels() : Observable<Hotel[]> {
        return this.http.get<Hotel[]>(this.url);
    }

    getHotelsInRange(distance : number) : Observable<HotelAndDistance[]> {
        let lat = sessionStorage.getItem("lat") ?? 0;
        let lng = sessionStorage.getItem("lng") ?? 0;
        return this.http.get<HotelAndDistance[]>(`${this.url}/in-range/${lat}/${lng}/${distance}`);
    }

    
}