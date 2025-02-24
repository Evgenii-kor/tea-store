import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductType} from "../../../../types/productType";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  isLong:boolean = false;
  product: ProductType;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      price: 0
    }

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const productId = Number(params.get('id'));
      if (!productId) {
        this.router.navigate(['/']);
        return;
      }
      this.showProduct(productId);
    });
  }
  showProduct(id: number) {
    this.productService.getProducts().subscribe({
      next: (data) => {
        const foundProduct = data.find(item => item.id === id);
        if (foundProduct) {
          this.product = foundProduct;
          this.productService.setSelectedProduct(this.product);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.router.navigate(['/']);
      }
    });
  }

}
