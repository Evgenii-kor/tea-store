import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {tap} from "rxjs";
import {ProductType} from "../../../../types/productType";
import {ProductService} from "../../../shared/services/product.service";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  loading: boolean = false;

  public products: ProductType[] = [];

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.productService.getProducts()
      .pipe(
        tap(()=> {
          this.loading = false;

        })
      )
      .subscribe({
        next: (data) => {
          this.products = data;
        }
      })
  }

}
