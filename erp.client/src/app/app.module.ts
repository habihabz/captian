import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt'; // Ensure correct import
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './pages/layout/sidebar/sidebar.component';
import { TopnavComponent } from './pages/layout/topnav/topnav.component';
import { FooterComponent } from './pages/layout/footer/footer.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { UsersComponent } from './pages/users/users.component';
import { RoleComponent } from './pages/role/role.component';// Adjust import path as necessary
import { AuthInterceptor } from './services/auth.interceptor';
import { environment } from '../environments/environment';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuAllocationComponent } from './pages/menu.allocation/menu.allocation.component';
import { Select2Directive } from './directives/select2.directive';
import { DataTablesModule} from 'angular-datatables';
import { CustomerComponent } from './pages/customer/customer.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { CategoryComponent } from './pages/category/category.component';
import { IncomeComponent } from './pages/income/income.component'
import { MasterDataComponent } from './pages/master-data/master-data.component';
import { AgGridModule } from 'ag-grid-angular'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductsComponent } from './pages/products/products.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { SitelayoutComponent } from './pages/website/sitelayout/sitelayout.component';
import { WebsiteTopComponent } from './pages/website/sitelayout/website-top/website-top.component';
import { WebsiteFooterComponent } from './pages/website/sitelayout/website-footer/website-footer.component';
import { WebHomeComponent } from './pages/website/web.home/web.home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { SingleProductComponent } from './pages/website/single-product/single-product.component';


// Define a function to get the token
export function tokenGetter() {
  return localStorage.getItem('token');
}

// Define the JWT configuration statically
const jwtConfig: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
    allowedDomains: [environment.serverHostAddress.replace(/^https?:\/\//, '')],
    disallowedRoutes: [`${environment.serverHostAddress}/auth/`],
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    DashboardComponent,
    SidebarComponent,
    TopnavComponent,
    FooterComponent,
    HeaderComponent,
    UsersComponent,
    RoleComponent,
    MenuComponent,
    MenuAllocationComponent,
    Select2Directive,
    CustomerComponent,
    SupplierComponent,
    CategoryComponent,
    IncomeComponent,
    MasterDataComponent,
    ProductsComponent,
    SitelayoutComponent,
    WebsiteTopComponent,
    WebsiteFooterComponent,
    WebHomeComponent,
    SingleProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule ,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    JwtModule.forRoot(jwtConfig), 
    DataTablesModule,
    AgGridModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSidenavModule  ,
    MatTabsModule,
    MatTableModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
