import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';
import * as productActions from '../state/product.actions';
import * as fromProduct from '../state/product.reducer';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;
  displayCode: boolean;
  products: Product[];
  componentActive = true;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;
  errorMessage$: Observable<string>;
  products$: Observable<Product[]>;

  constructor(private productService: ProductService, private store: Store<fromProduct.State>) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select(fromProduct.getCurrentProduct),
        takeWhile(() => this.componentActive)
      )
      .subscribe(currentProduct => {
        this.selectedProduct = currentProduct;
      });

    // Two ways to unsubscribe - way 1 - async pipe
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));

    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));

    // 2nd way of unsubscribing
    this.store
      .pipe(select(fromProduct.getShowProductCode, takeWhile(() => this.componentActive)))
      .subscribe(displayCode => {
        this.displayCode = displayCode;
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(true));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }
}
