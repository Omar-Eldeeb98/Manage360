import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _Router: Router = inject(Router);
  let _AuthService: AuthService = inject(AuthService);
  let _ToastrService: ToastrService = inject(ToastrService);

  if (localStorage.getItem('userToken') == null) {
    //^ ngx-toastr
    _ToastrService.error('You Shoud LogIn First', 'Not Allowed !');

    //^ sweetalert2
    // Swal.fire({
    //   icon: 'error',
    //   title: 'Not Allowed ',
    //   text: 'You Should (Sign In) First. ',
    // });

    _Router.navigate(['/signin']);
    return false;
  } else {
    _AuthService.setUserToken();
    return true;
  }
};
