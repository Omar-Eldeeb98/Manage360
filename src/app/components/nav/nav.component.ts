import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  isChanged: boolean = false;
  isLogin: boolean = false;
  storedToken: any = {};

  ngOnInit(): void {
    this._AuthService.userToken.subscribe(() => {
      if (localStorage.getItem('userToken') == null) {
        this.isLogin = false;
      }

      // if (this._AuthService.userToken.getValue() == null)
      //   {
      //   this.isLogin = false;
      // }
      else {
        this.isLogin = true;
        this.storedToken = localStorage.getItem('userToken');
        this.storedToken = jwtDecode(this.storedToken);
        console.log('decoded token test:  ===>', this.storedToken); //? just for testing
      }
    });
  }

  //^ function make user logout =================
  logout(): void {
    Swal.fire({
      title: 'Do you want to Logout?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        //? steps ...
        //! (1) remove user token from localstorage
        localStorage.removeItem('userToken');
        //! (2) make userDataVariable = null
        this._AuthService.setUserToken();
        //! (3) programming routing to login page  <login component>
        this._Router.navigate(['/signin']);
        Swal.fire('Logout successfully!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Logout canceled', '', 'error');
      }
    });
  }
}
