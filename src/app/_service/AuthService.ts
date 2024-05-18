import { Inject, Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { LoginRequest } from "../_dto/LoginRequest";
import { LoginResponse } from "../_dto/LoginResponse";
import { RegisterRequest } from "../_dto/RegiterRequest";

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    public url = "http://localhost:8080/api/v1/auth";
    public loginSubject : Subject<LoginResponse> = new Subject();

    constructor(
        private http: HttpClient,
    ){}

    public login(username: string, password: string) : Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            `${this.url}/login`,
            new LoginRequest(username, password)
        );
    }

    public resgiter(username: string, password: string) : Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            `${this.url}/register`,
            new LoginRequest(username, password)
        );
    }
}