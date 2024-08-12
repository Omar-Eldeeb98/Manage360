import { AnalysisComponent } from './pages/analysis/analysis.component';
import { authGuard } from './guard/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { EdituserComponent } from './pages/edituser/edituser.component';
import { AdduserComponent } from './pages/adduser/adduser.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { UserdetailsComponent } from './pages/userdetails/userdetails.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Chat Page',
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    title: 'Users Page',
    canActivate: [authGuard],
  },
  {
    path: 'adduser',
    component: AdduserComponent,
    title: 'Add New User',
    canActivate: [authGuard],
  },

  {
    path: 'edituser/:id',
    component: EdituserComponent,
    title: 'Update User',
    canActivate: [authGuard],
  },

  {
    path: 'userdetails/:id',
    component: UserdetailsComponent,
    title: 'User Details ',
    canActivate: [authGuard],
  },
  {
    path: 'analysis',
    component: AnalysisComponent,
    title: 'Analysis Page',
    canActivate: [authGuard],
  },
  { path: 'signin', component: SigninComponent, title: 'Sign-in Page' },
  { path: 'signup', component: SignupComponent, title: 'Sign-up Page' },
  { path: '**', component: NotfoundComponent, title: '404 Page' }, //^ Catch-all route for unknown routes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
