import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../interfaces/user.interface';
import { AUTH_URL } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(authForm: Auth){
    this.http.post(`${AUTH_URL}/login`, authForm)
  }
}
