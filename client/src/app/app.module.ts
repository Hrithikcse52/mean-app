import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { ProductsComponent } from './component/products/products.component';
import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';
import { CreateproductComponent } from './component/createproduct/createproduct.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,

    LoginComponent,
    CreateproductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    CookieModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
