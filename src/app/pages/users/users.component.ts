// import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
// import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/service/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private _UsersService: UsersService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  public users!: User[];

  userID!: string;
  userGender!: string;

  curPage!: number;
  pageSize!: number;

  ngOnInit(): void {
    this.handleGetAllUsers();

    this.curPage = 1;
    this.pageSize = 7; // Set your desired page size
  }
  numberOfPages() {
    return Math.ceil(this.users.length / this.pageSize);
  }

  handleGetAllUsers(): void {
    this._UsersService.getAllUsers().subscribe({
      next: (response) => {
        console.log(response); //? just for testing

        this.users = response;
      },
      error: (error) => {
        console.log(error); //? just for testing
      },
    });
  }

  handleDelete(id: number) {
    //^ sweetalert2
    Swal.fire({
      title: 'Do you want to Delete Employee?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._UsersService.deleteUser(id).subscribe({
          next: (response) => {
            console.log('deleted', response); //? just for testing
            this.handleGetAllUsers();
          },
          error: () => {},
        });
        //^ sweetalert2
        Swal.fire('Deleted Successfully!', '', 'success');
      } else if (result.isDenied) {
        //^ sweetalert2
        Swal.fire('Delete is Canceled', '', 'error');
      }
    });
  }

  handleEditUser(id: number): void {
    Swal.fire({
      title: 'Go to Edit Page?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Welcome ',
          text: 'Welcome to Update Page!',
          imageUrl: 'assets/logos/edit.png',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Welcome',
        });

        this._Router.navigate(['edituser/', id]);
      } else if (result.isDenied) {
        Swal.fire('Action is Canceled', '', 'error');
      }
    });
  }

  handleuserDetails(id: number): void {
    Swal.fire({
      title: 'Go to Employee Details Page?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._ToastrService.success('Welcome To User Details', 'Welcome');
        this._Router.navigate(['userdetails/', id]);
      } else if (result.isDenied) {
        Swal.fire('Action is Canceled', '', 'info');
      }
    });
  }
}
