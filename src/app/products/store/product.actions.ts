import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product';

export const loadProducts = createAction(
  '[Product list component] Load Products'
);

export const loadProductsSuccess = createAction(
  '[Product list component] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product list component] Load Products Failure',
  props<{ error: any }>()
);
