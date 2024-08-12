import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  baseUrl: string = 'https://note-sigma-black.vercel.app/api/v1/users/';

  userToken: BehaviorSubject<any> = new BehaviorSubject(null);

  //^ sign up
  signUp(userinfo: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}signUp`, userinfo);
  }

  //^ log in
  signin(userinfo: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}signIn`, userinfo);
  }

  //^
  setUserToken(): void {
    if (localStorage.getItem('userToken') != null) {
      this.userToken.next(localStorage.getItem('userToken'));
      this.userToken.next(jwtDecode(this.userToken.getValue()));
    } else {
      this.userToken.next(null);
    }
  }
}
