import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface AppConfig {
  inputStyle?: string;
  dark?: boolean;
  theme?: string;
  ripple?: boolean;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: any;
  config: any;
  basicData: any;
  basicOptions: any;
  chartOptions: any;
  items: any;
  products: any;
  constructor(private http: HttpClient, public router: Router) {}
  getUser() {
    this.http
      .get('http://localhost:5000/user', { withCredentials: true })
      .subscribe(
        (res) => {
          console.log('res', res);
        },
        (err) => {
          this.router.navigate(['/'], { skipLocationChange: true });
          console.log('res', err.error);
        }
      );
  }

  async getDataList() {
    return this.http
      .get('http://localhost:5000/product/dash', {
        withCredentials: true,
      })
      .toPromise();
  }
  mapData() {
    console.log('map data', this.items);
  }
  async ngOnInit() {
    this.getUser();
    let result = await this.getDataList();
    console.log('ressadsdsd,', result, typeof result);
    let stockAvail: any[] = [];
    let stockLable: any[] = [];
    let stockPrice: any[] = [];
    Object.entries(result as object).forEach(([key, value]) => {
      for (let m in value) {
        console.log('end: ', m);
        if (m === 'stock') stockAvail.push(value[m]);
        if (m === 'name') stockLable.push(value[m]);
        if (m === 'price') stockPrice.push(value[m]);
      }
    });
    this.data = {
      labels: stockLable,
      datasets: [
        {
          data: stockAvail,
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
          hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D'],
        },
      ],
    };
    this.mapData();
    this.basicData = {
      labels: stockLable,
      datasets: [
        {
          label: 'Price DB',
          backgroundColor: '#42A5F5',
          data: stockPrice,
        },
      ],
    };
    this.basicOptions = {
      scales: {
        x: {
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
        y: {
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
      },
    };
    this.config = {
      theme: 'lara-light-indigo',
      inputStyle: 'outlined',
      ripple: true,
    };
    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
    };
  }
}
