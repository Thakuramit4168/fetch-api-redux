import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setProducts, setError, setStatus } = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    dispatch(setProducts(data));
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setError(error.toString()));
    dispatch(setStatus('failed'));
  }
};

export default productSlice.reducer;
