import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface StepState {
  currentStep: number;
}

const initialState: StepState = {
  currentStep: 0,
};

export const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.currentStep += 1;
    // },
    // decrement: (state) => {
    //   state.currentStep -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.currentStep += action.payload;
    // },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount, setCurrentStep } =
export const { setCurrentStep } = stepSlice.actions;

export default stepSlice.reducer;
