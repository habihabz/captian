import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth.guard';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { RoleComponent } from './pages/role/role.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuAllocationComponent } from './pages/menu.allocation/menu.allocation.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CategoryComponent } from './pages/category/category.component';
import { IncomeComponent } from './pages/income/income.component';
import { MasterDataComponent } from './pages/master-data/master-data.component';
import { ProductsComponent } from './pages/products/products.component';
import { SitelayoutComponent } from './pages/website/sitelayout/sitelayout.component';
import { WebHomeComponent } from './pages/website/web.home/web.home.component';



const routes: Routes = [
  // Redirect empty path to login
  { path: '', redirectTo: 'web-home', pathMatch: 'full' },
  {  
    path: '',
    component: SitelayoutComponent,
    children: [
      {
        path: 'web-home',
        component: WebHomeComponent
      }]
  },
  // Define your login route
  {  
    path: 'login',
    component: LoginComponent
  },
  { path: 'logout', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'users',
        component : UsersComponent
      },
      {
        path: 'roles',
        component : RoleComponent
      },
      {
        path: 'menus',
        component : MenuComponent
      },
      {
        path: 'menuallocation',
        component : MenuAllocationComponent
      },
      {
        path: 'customers',
        component : CustomerComponent
      },
      {
        path : 'suppliers',
        component : SupplierComponent
      },
      {
        path : 'categories',
        component : CategoryComponent
      },
      {
        path : 'incomes',
        component : IncomeComponent
      },
      {
        path :'master-data',
        component :MasterDataComponent
      },
      {
        path :'products',
        component :ProductsComponent

      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

