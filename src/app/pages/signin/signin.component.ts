import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  errorMessage: string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,15}$/),
    ]),
  });

  handleForm(): void {
    this.isLoading = true;

    console.log(this.loginForm); //^ just for test

    this._AuthService.signin(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response); //^ just for test

        if (response.msg === 'done') {
          // this.isLoading = false;

          //^ save token to local storage
          localStorage.setItem(
            'userToken',
            `
          3b8ny__${response.token}`
          );

          this._AuthService.setUserToken();

          //^ ngx-Toastr
          this._ToastrService.success('Loged In Succesfully', 'Welcome');

          //^ sweetalert2
          // Swal.fire({
          //   position: 'center',
          //   icon: 'success',
          //   title: 'Log In Succesfully ',
          //   showConfirmButton: false,
          //   timer: 1000,
          // });

          setTimeout(() => {
            this._Router.navigate(['/home']);
          }, 1500);

          this.isLoading = false;
        }
      },
      error: (error) => {
        //^ ngx-Toastr
        this._ToastrService.error(error.error.msg, 'Unexpected Error');
        console.log(error); //^ just for test
        this.isLoading = false;
        this.errorMessage = error.error.msg;
      },
    });
  }

  ngOnInit(): void {}
}
