import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductState } from '../../store';
import * as fromActions from '../../store/product.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    public router: Router,
    private _store: Store<ProductState>
  ) {}

  ngOnInit() {
    this._store.dispatch(fromActions.loadProducts());
    this.loadProducts();
  }

  loadProducts() {
    const productsObserver = {
      next: (products: Product[]) => {
        this._store.dispatch(fromActions.loadProductsSuccess({ products }));
        this.products = products;
      },
      error: (err) => {
        this._store.dispatch(fromActions.loadProductsFailure({ error: err }));
        console.error(err);
      },
    };

    this.productService.getProducts().subscribe(productsObserver);
  }

  deleteProduct(id: number) {
    const productsObserver = {
      next: () => {
        console.log('Product Deleted');
        this.ngOnInit();
      },
      error: (err) => console.error(err),
    };
    this.productService.deleteProduct(id).subscribe(productsObserver);
  }
}
