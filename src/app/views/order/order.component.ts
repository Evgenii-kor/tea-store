import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductType} from "../../../types/productType";
import {OrderType} from "../../../types/orderType";
import {ProductService} from "../../shared/services/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  private subscriptionOrder: Subscription | null = null;
  isSubmitting: boolean = false;
  product!: ProductType;
  errorMessage:string = '';
  orderCompleted: boolean = false;
  orderForm: FormGroup = this.fb.group({
    inputName: ['', [Validators.required, Validators.pattern('^[а-яА-Я]+$')]],
    inputSurname: ['', [Validators.required, Validators.pattern('^[а-яА-Я]+$')]],
    inputTel: ['', [Validators.required, Validators.pattern('^\\+?\\d{11}$')]],
    product: [''],
    inputCountry: ['', Validators.required],
    inputZip: ['', Validators.required],
    inputAddress: ['', [Validators.required, Validators.pattern('^[А-Яа-я0-9 \\-/]+$')]],
    comment: ['']
  })

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.selectedProduct$.subscribe(product => {
      if (product) {
        this.orderForm.patchValue({product: product.title});
      }
    });
  }

  private showSuccessMessage() {
    const dialog = document.getElementById('dialog');
    if (dialog) {
      this.orderCompleted = true;
      dialog.classList.remove('d-none');
      setTimeout(() => {
        this.orderCompleted = false;
        dialog.classList.add('d-none');
      }, 3000)
    }
  }
  showErrorMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Через 3 секунды скрываем ошибку
    }, 3000);
  }

  ngOnDestroy() {
    this.subscriptionOrder?.unsubscribe();
  }

  createOrder() {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const orderData: OrderType = {
      name: this.orderForm.value.inputName,
      last_name: this.orderForm.value.inputSurname,
      phone: this.orderForm.value.inputTel,
      product: this.orderForm.value.product,
      country: this.orderForm.value.inputCountry,
      zip: this.orderForm.value.inputZip,
      address: this.orderForm.value.inputAddress
    };

    if (this.orderForm.value.comment) {
      orderData.comment = this.orderForm.value.comment;
    }

    this.subscriptionOrder = this.productService.createOrder(orderData).subscribe({
      next: (response: { message?: string, success: number }) => {
        this.isSubmitting = false;
        if (response.success === 1) {
          this.showSuccessMessage();
        this.orderForm.reset();
        } else {
          this.orderForm.reset();
          this.showErrorMessage('Произошла ошибка. Попробуйте еще раз.')
        }
      },
      error: (err) => {
        console.error('Ошибка при отправке заказа:', err);
        alert('Ошибка при отправке заказа, попробуйте снова.');
      }
    });
  }

}
