import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  errorMessage: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,15}$/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(1[89]|[2-9][0-9]|[1-9][0-9]{2,})$/),
    ]),
  });

  handleForm(): void {
    // console.log(this.registerForm);
    this.isLoading = true;

    this._AuthService.signUp(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('signup testing ', response); //^ just for testing
        if (response.msg === 'done') {
          //^ ngx-Toastr
          this._ToastrService.success('Account Created Successfully', 'Great ');

          this.isLoading = false;
          this.registerForm.reset();
          setTimeout(() => {
            this._Router.navigate(['/signin']);
          }, 1000);
        }
      },
      error: (error) => {
        console.log(error); //^ just for testing
        this.isLoading = false;
        //^ ngx-Toastr
        this._ToastrService.error(error.error.msg, 'Ops! ');
        // this.registerForm.reset();
        this.errorMessage = error.error.msg;
      },
    });
  }
  ngOnInit(): void {}
}
