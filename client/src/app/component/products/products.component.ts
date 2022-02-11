import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  activeRoute: Boolean = false;
  products: any;
  tempStock = 0;
  stock: FormGroup = this.formBuilder.group({
    stock: '',
    sold: '',
  });
  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  getUser() {
    this.http
      .get('http://localhost:5000/user', { withCredentials: true })
      .subscribe(
        (res) => {
          console.log('res', res);
        },
        (err) => {
          this.router.navigate(['/']);
          console.log('res', err.error);
        }
      );
  }
  updateStock(product: any) {
    console.log(this.stock.value);
    this.http
      .put(
        `http://localhost:5000/product/update/${product._id}`,
        this.stock.value,
        {
          withCredentials: true,
        }
      )
      .subscribe((res: any) => {
        console.log(res);
        this.getData();
      });
  }
  createNav() {
    this.router.navigate(['create']);
  }
  edit(product: any) {
    product.isEdit = true;
    this.tempStock = product.stock;
    console.log('cars', this.products);
  }
  updateSold() {}
  getData() {
    this.http
      .get('http://localhost:5000/product/list', {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        console.log(res);
        this.products = res;
      });
  }
  ngOnInit(): void {
    this.getUser();
    this.getData();

    this.activeRoute = this.router.url.slice(1) === 'product';
  }
}
