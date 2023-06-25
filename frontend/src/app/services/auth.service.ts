import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../interfaces/user.interface';
import { AUTH_URL } from 'src/environments/environment.dev';
import jwt_decode from 'jwt-decode';
import { firstValueFrom } from 'rxjs';
import { Token } from '../interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  token: Token = {access_token: ''}

  async login(authForm: Auth){
    this.token = await firstValueFrom(this.http.post<Token>(`${AUTH_URL}/login`, authForm))
    
    
    this.setToken()
    return this.token
  }

  setToken(): string{

    
    if (this.token?.access_token != ''){
      console.log(jwt_decode(this.token.access_token));
      
      let role = (jwt_decode(this.token.access_token) as any).roles
      localStorage.setItem('role', role[0])
      localStorage.setItem('token', this.token.access_token)
      return 'token setted'
    }
    return 'token does not contain a value'
  }

  getToken(){

    return this.token.access_token
  }

  isAuthorized(): boolean{
  
    
    return !!localStorage.getItem('token')
  }
}
