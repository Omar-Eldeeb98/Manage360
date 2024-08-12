import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Import Material UI modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

// components
import { NavComponent } from './components/nav/nav.component';
import { UsersComponent } from './pages/users/users.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { HomeComponent } from './pages/home/home.component';
import { AdduserComponent } from './pages/adduser/adduser.component';
import { FooterComponent } from './components/footer/footer.component';
import { EdituserComponent } from './pages/edituser/edituser.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserdetailsComponent } from './pages/userdetails/userdetails.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { jwtDecode } from 'jwt-decode';
import { SearchPipe } from './pipes/search.pipe';
import { GendersearchPipe } from './pipes/gendersearch.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    UsersComponent,
    NotfoundComponent,
    HomeComponent,
    AdduserComponent,
    FooterComponent,
    EdituserComponent,
    SignupComponent,
    SigninComponent,
    UserdetailsComponent,
    AnalysisComponent,
    SkeletonComponent,
    SearchPipe,
    GendersearchPipe,
  ],
  imports: [
    // required animations module
    ToastrModule.forRoot({
      preventDuplicates: true,
      autoDismiss: true,
      closeButton: true,
    }), // ToastrModule added
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    ReactiveFormsModule,
    ChartModule,
    FormsModule,
    ClipboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
