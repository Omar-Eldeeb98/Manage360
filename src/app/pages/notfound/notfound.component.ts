import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
})
export class NotfoundComponent {
  constructor(private _location: Location) {}

  //^ func make user navigate to previous route
  navigateToPreviousRoute(): void {
    this._location.back();
  }
}
