import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DataState {
  data: any;
}

const initialState: DataState = {
  data: {
    firstName: 'Steve',
    lastName: 'Jobs',
    email: 'asflkj@lkjadf.com',
    phone: '1234567890',
    iceCream: 'chocolate',
    freeForm: 'This is a free form text area',
  },
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
