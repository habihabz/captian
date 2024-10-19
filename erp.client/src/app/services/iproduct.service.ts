import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class IProductService {
  private apiUrl = `${environment.serverHostAddress}/api/Product`;
  private refreshProductsSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.post<Product[]>(this.apiUrl + "/getProducts", {});  
  }

  getProduct(id: number): Observable<Product> {
    return this.http.post<Product>(this.apiUrl + "/getProduct", id);  
  }

  deleteProduct(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteProduct", id); 
  }

  createOrUpdateProduct(Product: Product): Observable<DbResult> {
    Product.p_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateProduct", Product); 
  }
  get refreshProducts$() {
    return this.refreshProductsSubject.asObservable();
  }
  refreshProducts(): void {
    this.refreshProductsSubject.next();
  }
}
