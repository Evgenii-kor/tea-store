import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import {RouterModule} from "@angular/router";
import {ProductComponent} from "./product/product.component";
import {ProductsComponent} from "./products/products.component";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    RouterModule,
    ProductsRoutingModule
  ],
  exports:[
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
