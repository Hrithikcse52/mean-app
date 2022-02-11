import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Emitter } from './emitters/emitters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  authData: any = {};
  username: string = 'User';
  cookie = {};
  constructor(private cookieService: CookieService, private router: Router) {}
  signOut() {
    this.cookieService.removeAll();
    this.cookie = {};
    this.authData = {};
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.cookie = this.cookieService.get('token');
    Emitter.authEmitter.subscribe((auth) => {
      this.authData = auth;
    });
  }
}
