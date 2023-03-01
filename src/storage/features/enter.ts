/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type EnterState = {
  status: boolean;
};

const initialState: EnterState = {
  status: true,
};

const EnterSlice = createSlice({
  name: 'enter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

export default EnterSlice.reducer;
export const { actions } = EnterSlice;
