import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AdduserComponent implements OnInit {
  constructor(
    private _UsersService: UsersService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {}

  //^ add user form
  addUserForm: FormGroup = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{1,5}$/),
    ]),
    fName: new FormControl('', [Validators.required]),
    // image: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    lName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    gender: new FormControl('male'),
  });

  isLoading: boolean = false;
  p: string = '[0-9]{1,5}';

  ngOnInit(): void {}

  //!========================================================================
  //^ handle file change event
  // handleFileInput(files: FileList) {
  //   const file = files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = (event: any) => {
  //     this.addUserForm.patchValue({
  //       image: event.target.result,
  //     });
  //   };
  // }
  //!========================================================================
  //^ add new  user
  addUser() {
    this.isLoading = true;

    this._UsersService.addUser(this.addUserForm.value).subscribe({
      next: (response) => {
        console.log(response); //? just for testing MFucker !!!!!!
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User Added Successfully',
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          this.isLoading = false;
          this._Router.navigate(['/users']);
          this.addUserForm.reset();
        }, 1200);
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }

  //&=========================================================================

  // Handle file change event
}
