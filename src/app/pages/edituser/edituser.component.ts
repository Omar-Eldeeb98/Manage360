import { User } from 'src/app/models/user';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss'],
})
export class EdituserComponent implements OnInit, OnChanges {
  constructor(
    private _UsersService: UsersService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}
  ngOnChanges(): void {}

  //^ Edit user form
  editUserform: FormGroup = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    fName: new FormControl('', [Validators.required]),
    lName: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    gender: new FormControl('male'),
  });

  //^
  user: any = {};
  isLoading: boolean = false;

  ngOnInit(): void {
    const paramID = this._ActivatedRoute.snapshot.params['id'];
    this._UsersService.getUserById(paramID).subscribe({
      next: (response) => {
        this.user = response;
        console.log('just for test', this.user);
        this.settingData();
      },
    });
  }

  // ngAfterViewChecked(): void {}

  settingData(): void {
    this.editUserform.setValue(this.user);
  }

  goBack(): void {
    this._Router.navigate(['/users']);
  }

  //^ update user func
  updateUser(): void {
    this.isLoading = true;
    this._UsersService.updateUser(this.editUserform.value).subscribe({
      next: (response) => {
        console.log(response); //? just for testing

        //^ ngx-Toastr
        this._ToastrService.success('user Updated Successfully', 'Success ');

        //^ sweet alert
        // Swal.fire({
        //   position: 'center',
        //   icon: 'success',
        //   title: 'User Updated Successfully',
        //   showConfirmButton: false,
        //   timer: 1500,
        // });

        setTimeout(() => {
          this.isLoading = false;
          this._Router.navigate(['/users']);
          this.editUserform.reset();
        }, 1000);
      },
      error: (error) => {
        console.error('Error:', error); //? just for testing
      },
    });
  }
}
