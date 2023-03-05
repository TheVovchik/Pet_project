/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
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
    setStatus: (state) => {
      state.signedIn = true;
    },
  },
});

export default AdminSlice.reducer;
export const { actions } = AdminSlice;
