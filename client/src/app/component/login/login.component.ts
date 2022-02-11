import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Emitter } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [],
})
export class LoginComponent implements OnInit {
  // emailFormControl = new FormControl('', [
  //     Validators.required,
  //     Validators.email,
  // ]);

  data: FormGroup = this.formBuilder.group({
    email: 'test@test.com',
    password: 'test',
  });
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  onSubmit(): void {
    console.log(this.data.value);
    this.http
      .post('http://localhost:5000/user/login', this.data.value, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        console.log(res);
        if (res?.code !== 200) {
        } else {
          Emitter.authEmitter.emit(res);
          this.router.navigate(['dashboard'], { skipLocationChange: true });
        }
      });
    this.data.reset();
  }
  ngOnInit(): void {}
}
