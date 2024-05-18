import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Reservation } from "../_model/Reservation";

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    constructor(
        private http : HttpClient
    ) {}

    url = "http://localhost:8080/api/v1/reservation";

    getReservations() : Observable<Reservation[]> {
        return this.http.get<any>(this.url,
            {headers: new HttpHeaders({'Authorization': this.makeAuthHeader()})});
    }
    
    makeReservation(rooms : number[], startDate : string, endDate : string) : Observable<Reservation> {
        let body = {
            roomIds : rooms,
            startDate : startDate,
            endDate : endDate
        }
        return this.http.post<Reservation>(this.url, body,
          {headers: new HttpHeaders({'Authorization': this.makeAuthHeader()})});
    }

    

    cancelReservation(id : number) : Observable<any>{
        return this.http.delete<any>(`${this.url}/${id}`,
            {headers: new HttpHeaders({'Authorization': this.makeAuthHeader()})});
    }
    
    private makeAuthHeader() : string {
        return 'Bearer ' + sessionStorage.getItem("token") ?? "";
      }
}