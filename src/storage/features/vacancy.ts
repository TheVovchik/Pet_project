/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type VacancyState = {
  cover: File | null;
  coverUrl: string;
  title: string;
  duties: string[];
  demands: string[];
  schedule: string;
  contacts: string;
};

const initialState: VacancyState = {
  cover: null,
  coverUrl: '',
  title: '',
  duties: [],
  demands: [],
  schedule: '',
  contacts: '',
};

const VacancySlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCover: (state, action: PayloadAction<File>) => {
      state.cover = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    addDutie: (state, action: PayloadAction<string>) => {
      state.duties.push(action.payload);
    },
    removeDutie: (state, action: PayloadAction<string>) => {
      state.duties = state.duties.filter(dutie => dutie !== action.payload);
    },
    addDemand: (state, action: PayloadAction<string>) => {
      state.demands.push(action.payload);
    },
    removeDemand: (state, action: PayloadAction<string>) => {
      state.demands = state.demands.filter(demand => demand !== action.payload);
    },
    setSchedule: (state, action: PayloadAction<string>) => {
      state.schedule = action.payload;
    },
    setContacts: (state, action: PayloadAction<string>) => {
      state.contacts = action.payload;
    },
    setCoverUrl: (state, action: PayloadAction<string>) => {
      state.coverUrl = action.payload;
    },
  },
});

export default VacancySlice.reducer;
export const { actions } = VacancySlice;
