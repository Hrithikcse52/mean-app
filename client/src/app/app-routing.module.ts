import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateproductComponent } from './component/createproduct/createproduct.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProductsComponent } from './component/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  { path: 'product', component: ProductsComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'create', component: CreateproductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
