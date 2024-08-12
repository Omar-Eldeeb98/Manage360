import { UsersService } from './../../service/users.service';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnInit {
  allUsers!: User[];
  juniorUsers!: User[];
  seniorUsers!: User[];
  leaderUsers!: User[];
  managerUsers!: User[];
  ceoUsers!: User[];
  males!: User[];
  females!: User[];

  testChart!: Chart;
  testChart0!: Chart;

  constructor(private _UsersService: UsersService) {
    this._UsersService.getAllUsers().subscribe({
      next: (response) => {
        console.log('response : ', response); //? just for test
        this.allUsers = response;
        console.log('allUsers', this.allUsers);
        console.log(this.allUsers.length);

        this.getFiltered(); //^

        this.showData2();
        this.showData0();
      },
      error: (error) => {
        console.log(error); //? just for test
      },
    });
  }
  ngOnInit(): void {}

  getFiltered(): void {
    this.juniorUsers = this.allUsers.filter((user) => user.role === 'junior');
    this.seniorUsers = this.allUsers.filter((user) => user.role === 'senior');
    this.leaderUsers = this.allUsers.filter((user) => user.role === 'leader');
    this.managerUsers = this.allUsers.filter((user) => user.role === 'manager');
    this.ceoUsers = this.allUsers.filter((user) => user.role === 'ceo');
    this.males = this.allUsers.filter((user) => user.gender === 'male');
    this.females = this.allUsers.filter((user) => user.gender === 'female');
  }

  showData2(): void {
    this.testChart = new Chart({
      title: {
        text: 'Active Positions ',
      },
      plotOptions: {
        column: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
          },
          showInLegend: true,
        },
      },
      xAxis: {
        categories: ['Juniors', 'Seniors', 'Leaders', 'Managers', 'CEO-s'],
        crosshair: true,
        accessibility: {
          description: 'Company Positions',
        },
      },
      yAxis: {
        title: {
          text: 'Numbers Of Employees',
        },
      },
      series: [
        {
          shadow: 'true' as any,
          type: 'column',
          name: 'Having This Role   ',

          data: [
            {
              name: 'Juniors ',
              color: 'green',
              y: this.juniorUsers.length,
            },
            {
              name: 'Seniors',
              color: 'orange',
              y: this.seniorUsers.length,
            },
            {
              name: 'Leaders',
              color: 'blue',
              y: this.leaderUsers.length,
            },
            {
              name: 'Managers',
              color: 'red',
              y: this.managerUsers.length,
            },
            {
              name: 'CEO',
              color: '#2DAACD',
              y: this.ceoUsers.length,
            },
          ],
        },
      ],
    });
  }

  showData0(): void {
    this.testChart0 = new Chart({
      title: {
        text: 'Males VS Males',
      },
      plotOptions: {
        column: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
          },
          showInLegend: true,
        },
      },

      series: [
        {
          shadow: 'true' as any,
          type: 'pie',
          name: 'Total',

          data: [
            {
              name: 'Males ',
              color: 'Blue',
              y: this.males.length,
              sliced: true,
            },
            {
              name: 'Females',
              color: 'Pink',
              y: this.females.length,
            },
          ],
        },
      ],
    });
  }
}
