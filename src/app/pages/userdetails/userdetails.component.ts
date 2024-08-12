import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'jquery';
import { UsersService } from 'src/app/service/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss'],
})
export class UserdetailsComponent implements OnInit {
  constructor(
    private _UsersService: UsersService,
    private _ActivatedRoute: ActivatedRoute,
    private _location: Location
  ) {}

  user!: User;

  //^ func make user navigate to previous route
  navigateToPreviousRoute(): void {
    this._location.back();
  }
  ngOnInit(): void {
    const paramID = this._ActivatedRoute.snapshot.params['id'];
    this._UsersService.getUserById(paramID).subscribe({
      next: (response) => {
        console.log('user details : ', response); //? just for testing
        this.user = response;
      },
      error: (error) => {
        console.log(error); //? just for testing
      },
    });
  }
}
