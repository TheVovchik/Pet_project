/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type VacancyState = {
  cover: string;
  coverUrl: string;
  title: string;
  duties: string[];
  demands: string[];
  schedule: string;
  contacts: string;
  id: string;
};

const initialState: VacancyState = {
  cover: '',
  coverUrl: '',
  title: '',
  duties: [],
  demands: [],
  schedule: '',
  contacts: '',
  id: '',
};

const VacancySlice = createSlice({
  name: 'vacancy',
  initialState,
  reducers: {
    resetFields: (state) => {
      state.cover = '';
      state.coverUrl = '';
      state.title = '';
      state.id = '';
      state.duties = [];
      state.demands = [];
      state.schedule = '';
      state.contacts = '';
    },
    setCover: (state, action: PayloadAction<string>) => {
      state.cover = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDuties: (state, action: PayloadAction<string[]>) => {
      state.duties = action.payload;
    },
    setDemands: (state, action: PayloadAction<string[]>) => {
      state.demands = action.payload;
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
    setVacancyId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export default VacancySlice.reducer;
export const { actions } = VacancySlice;
