import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ProductType} from "../../../types/productType";
import {OrderType} from "../../../types/orderType";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductType[]>{
    return this.http.get<ProductType[]>(environment.apiURL + 'tea')
  }

  private selectedProduct = new BehaviorSubject<ProductType | null>(null);
  selectedProduct$ = this.selectedProduct.asObservable();

  setSelectedProduct(product: ProductType) {
    this.selectedProduct.next(product);
  }

  createOrder(data: OrderType){
    return this.http.post<{success:number, message?:string}>(environment.apiURL + `order-tea`, data)
  }

}



