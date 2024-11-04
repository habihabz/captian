import { Component, ElementRef, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { Router } from '@angular/router';
import { IProductService } from '../../../services/iproduct.service';
import { IMasterDataService } from '../../../services/imaster.data.service';
import { ICategoryService } from '../../../services/icategory.service';
import { Category } from '../../../models/category.model';
import { MasterData } from '../../../models/master.data.model';
import { RequestParms } from '../../../models/requestParms';
import { Subscription } from 'rxjs';
import { ProdAttachement } from '../../../models/prod.attachments.model';

@Component({
  selector: 'app-web.home',
  templateUrl: './web.home.component.html',
  styleUrl: './web.home.component.css'
})
export class WebHomeComponent   implements OnInit{
  product:Product=new Product();
  products:Product []=[];
  categories: Category[] = [];
  subcategories: MasterData[] = [];
  requestParms: RequestParms = new RequestParms();
  subscription: Subscription = new Subscription();
  
  constructor(
    private elRef: ElementRef,
    private router: Router,
    private iproductService: IProductService,
    private imasterDataService: IMasterDataService,
    private icategoryService: ICategoryService,
  ) {
    
  }

  
  ngOnInit(): void {
    this.getProducts();
    this.loadCategories();
    this.subscription.add(
      this.iproductService.refreshProducts$.subscribe(() => {
        this.getProducts();
      })

    );

    this.getMasterDatasByType("SubCategory", (data) => { this.subcategories = data; });
 
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
  loadCategories(): void {
    this.icategoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error: any) => {
       
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
       
        callback([]);  // Pass an empty array if there's an error
      }
    );
  }
  displayedColumns: string[] = ['product', 'description', 'price', 'action'];

  // Define the products for each category
  category1Products = [
    { name: 'Running Shoes', description: 'High-performance running shoes.', price: 99.99 },
    { name: 'Basketball', description: 'Durable and lightweight basketball.', price: 29.99 }
  ];

  category2Products = [
    { name: 'Yoga Mat', description: 'Comfortable yoga mat for your practice.', price: 19.99 },
    { name: 'Soccer Ball', description: 'High-quality soccer ball for training.', price: 34.99 }
  ];

  category3Products = [
    { name: 'Sports Watch', description: 'Stylish sports watch with heart rate monitor.', price: 149.99 },
    { name: 'Water Bottle', description: 'Insulated water bottle for athletes.', price: 19.99 }
  ];

  getProductsByCategory(category: Category) {
    return this.products.filter(product => product.p_category === category.ct_id);
  }
  getProductAttachments(product:Product){
    try {
      return JSON.parse(product.p_attachements) as ProdAttachement[];
    } catch (error) {
      console.error('Error parsing attachments JSON:', error);
      return [];
    }
  }
  parseAttachments(attachmentsJson: string): ProdAttachement[] {
    try {
      return JSON.parse(attachmentsJson) as ProdAttachement[];
    } catch (error) {
      console.error('Error parsing attachments JSON:', error);
      return [];
    }
  }

}
