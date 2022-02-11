import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css'],
})
export class CreateproductComponent implements OnInit {
  data: FormGroup = this.formBuilder.group({
    name: '',
    price: '',
    stock: '',
    image: '',
  });
  createProduct(): void {
    console.log(this.data.value);
    this.http
      .post('http://localhost:5000/product/create', this.data.value, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        console.log(res);
        if (res.code === 200)
          this.router.navigate(['product'], { skipLocationChange: true });
      });
    this.data.reset();
  }
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
