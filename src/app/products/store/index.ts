import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product';
import { loadProductsSuccess, loadProductsFailure } from './product.actions';

export const productStateFeatureKey = 'productState';

export interface ProductState {
  products: Product[];
  error: any;
}

export const intialState: ProductState = {
  products: undefined,
  error: undefined,
};

export const reducers = createReducer(
  intialState,
  on(loadProductsSuccess, (state: ProductState, action) => {
    return {
      products: action.products,
    };
  }),
  on(loadProductsFailure, (state: ProductState, action) => {
    return {
      products: state.products,
      error: action.error,
    };
  })
);

export const selectProductsFeature = createFeatureSelector<ProductState>(
  productStateFeatureKey
);

export const selectProducts = createSelector(
  selectProductsFeature,
  (state: ProductState) => state.products
);

export const metaReducers: MetaReducer<ProductState>[] = !environment.production
  ? []
  : [];
