import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DataState {
  data: any;
}

const initialState: DataState = {
  data: {},
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any>) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
