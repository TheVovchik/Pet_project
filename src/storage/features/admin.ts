/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFromLocalStorage } from '../../utils/localStorage';

type AdminState = {
  uid: string;
  signedIn: boolean;
};

const initialState: AdminState = {
  uid: getFromLocalStorage('uid'),
  signedIn: getFromLocalStorage('signedIn'),
};

const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<string>) => {
      state.signedIn = true;
      state.uid = action.payload;
    },
  },
});

export default AdminSlice.reducer;
export const { actions } = AdminSlice;
