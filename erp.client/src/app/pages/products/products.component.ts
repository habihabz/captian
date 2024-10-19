import { Component, ChangeDetectionStrategy, ElementRef, OnInit, ViewChild } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { GridService } from '../../services/igrid.service';
import { AgGridAngular } from 'ag-grid-angular';
import { IuserService } from '../../services/iuser.service';
import { Router } from '@angular/router';
import { ICustomerService } from '../../services/icustomer.service';
import { SnackBarService } from '../../services/isnackbar.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { IProductService } from '../../services/iproduct.service';
import { Product } from '../../models/product.model';
import { IMasterDataService } from '../../services/imaster.data.service';
import { ICategoryService } from '../../services/icategory.service';
import { Category } from '../../models/category.model';
import { DbResult } from '../../models/dbresult.model';
import { MasterData } from '../../models/master.data.model';
import { RequestParms } from '../../models/requestParms';


declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  pagination = true;
  paginationPageSize = 15;
  paginationPageSizeSelector = [15, 30, 50, 100];
  currentUser: User = new User();
  subscription: Subscription = new Subscription();
  products: Product[] = [];
  product: Product = new Product();
  dbResult: DbResult = new DbResult();
  categories: Category[] = [];
  subcategories: MasterData[] = [];
  divisions: MasterData[] = [];
  subdivisions: MasterData[] = [];
  requestParms: RequestParms = new RequestParms();

  @ViewChild('productsGrid') productsGrid!: AgGridAngular;

  constructor(
    private iuserService: IuserService,
    private elRef: ElementRef,
    private router: Router,
    private icustomerService: ICustomerService,
    private snackBarService: SnackBarService,
    private igridService: GridService,
    private iproductService: IProductService,
    private imasterDataService: IMasterDataService,
    private icategoryService: ICategoryService,



  ) {
    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id === 0) {
      this.router.navigate(['login']);
    }
  }

  colDefs: ColDef[] = [
    { headerName: "Id", field: "p_id" },
    { headerName: "Name", field: "p_name" },
    { headerName: "Short Name", field: "p_short_name" },
    { headerName: "Description", field: "p_description" },
    { headerName: "Category", field: "p_category_name" },
    { headerName: "Sub Category", field: "p_sub_category_name" },
    { headerName: "Division", field: "p_division_name" },
    { headerName: "Sub Division", field: "p_sub_division_name" },
    { headerName: "Created By", field: "p_cre_by_name" },
    { headerName: "Created Date", field: "p_cre_date" },
    {
      headerName: 'Variant', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Variant', action: 'getVariants', cssClass: 'btn btn-warning', icon: 'fa fa-list', getVariant: (data: any) => this.onAction('variant', data)
      },
    },
    {
      headerName: 'Edit', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Edit', action: 'onEdit', cssClass: 'btn btn-info', icon: 'fa fa-edit', onEdit: (data: any) => this.onAction('edit', data)
      },
    },
    {
      headerName: 'Delete', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Delete', action: 'onDelete', cssClass: 'btn btn-danger', icon: 'fa fa-trash', onDelete: (data: any) => this.onAction('delete', data)
      },
    }
  ];

  frameworkComponents = {
    actionRenderer: ActionRendererComponent
  };

  defaultColDef = {
    srrtable: true,
    filter: true
  };

  ngOnInit(): void {
    this.getProducts();
    this.loadCategories();
    this.subscription.add(
      this.iproductService.refreshProducts$.subscribe(() => {
        this.getProducts();
      })

    );

    this.getMasterDatasByType("SubCategory", (data) => { this.subcategories = data; });
    this.getMasterDatasByType("Division", (data) => { this.divisions = data; });
    this.getMasterDatasByType("SubDivision", (data) => { this.subdivisions = data; });
  }
  loadCategories(): void {
    this.icategoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error: any) => {
        this.snackBarService.showError('Error fetching categories ' + error);
      }
    );
  }
  getMasterDatasByType(masterType: string, callback: (data: MasterData[]) => void): void {
    this.requestParms = new RequestParms();
    this.requestParms.type = masterType;
    this.imasterDataService.getMasterDatasByType(this.requestParms).subscribe(
      (data: MasterData[]) => {
        callback(data);  // Pass the data to the callback function
      },
      (error: any) => {
        this.snackBarService.showError('Error fetching master data ' + error);
        callback([]);  // Pass an empty array if there's an error
      }
    );
  }

  onAction(action: string, data: any) {
    switch (action) {
      case 'edit':
        this.onEdit(data);
        break;
      case 'delete':
        this.onDelete(data);
        break;
      case 'variant':
        this.getVariant(data);
        break;
     
      default:
        this.snackBarService.showError("Unknown Action " + action);;
    }
  }


  onEdit(data: any) {
    this.iproductService.getProduct(data.p_id).subscribe(
      (data: Product) => {
        this.product = data;
        this.setSelect2Values();
        $('#productFormModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching income', error);
      }
    );
  }

  onDelete(data: any) {
    this.iproductService.deleteProduct(data.p_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.products = this.products.filter(p => p.p_id !== data.p_id);

          this.snackBarService.showError("Successfully Removed");;
        } else {
          alert(result.message);
        }
      },
      (error: any) => {
        console.error('Error deleting income', error);
      }
    );
  }

  getVariant(data: any){

  }
  
 
  getProducts() {
    this.iproductService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error: any) => {
      }
    );
  }
  onGridReady(event: GridReadyEvent) {
    this.igridService.resizeGridColumns(this.productsGrid.api);
  }

  openCreateFormModal(): void {
    $('#productFormModal').modal('show');
  }

  onCategoryChange(c_id: any) { this.product.p_category = c_id; }
  onSubCategoryChange(sc_id: any) { this.product.p_sub_category = sc_id; }
  onDivisionChange(d_id: any) { this.product.p_division = d_id; }
  onSubDivisionChange(sd_id: any) { this.product.p_sub_division = sd_id; }


  createOrUpdateProduct() {
    this.product.p_cre_by = this.currentUser.u_id; // Update property to match Category model
    this.iproductService.createOrUpdateProduct(this.product).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message === "Success") {
          $('#productFormModal').modal('hide');
          this.iproductService.refreshProducts();
          this.snackBarService.showSuccess("Successfully Saved");
        } else {
          this.snackBarService.showError(data.message);
        }
      },
      (error: any) => {
      }
    );
  }
  setSelect2Values() {
    $("#p_category").val(this.product.p_category).trigger('change');
    $("#p_sub_category").val(this.product.p_sub_category).trigger('change');
    $("#p_division").val(this.product.p_division).trigger('change');
    $("#p_sub_division").val(this.product.p_sub_division).trigger('change');

  }

}
