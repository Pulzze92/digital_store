import { SortType } from './filterSlice';
import { CartItem } from './cartSlice';
import { RootState } from '../store';
import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type Product = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ProductSliceState {
  items: Product[];
  status: Status;
}

export type SearchProductParams = {
  sortBy: string;
  order: string;
  categoryFilter: string;
  currentPage: string;
  searchByTyping: string;
  sort?: string;
};

export const fetchProduct = createAsyncThunk<Product[], SearchProductParams>(
  'product/fetchProductsStatus',
  async (params) => {
    const { sortBy, order, categoryFilter, searchByTyping, currentPage } = params;
    const { data } = await axios.get<Product[]>(
      `https://627fc5b2b1cc1b126259d638.mockapi.io/items?page=${currentPage}&limit=4&${categoryFilter}&sortBy=${sortBy}&order=${order}${searchByTyping}`,
    );

    return data;
  },
);

const initialState: ProductSliceState = {
  items: [],
  status: Status.LOADING,
};

const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchProduct.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectProductData = (state: RootState) => state.product;

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;
