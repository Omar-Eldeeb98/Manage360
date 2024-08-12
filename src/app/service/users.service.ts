import { User } from './../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _HttpClient: HttpClient) {}

  private baseUrl = 'http://localhost:3000';

  // private baseUrl =
  //   'https://my-json-server.typicode.com/Omar-Eldeeb98/M360-Server';

  //& add users function
  addUser(userData: User): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/users`, userData);
  }

  getAllUsers(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/users`);
  }

  //& get specific user
  getUserById(id: number): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/users/${id}`);
  }

  //& delete specific user
  deleteUser(id: number): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/users/${id}`);
  }

  //& update specific user
  updateUser(userData: User): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}/users/${userData.id}`,
      userData
    );
  }
}
