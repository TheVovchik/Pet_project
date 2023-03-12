/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PostState = {
  covers: string[];
  coversUrl: string[];
  title: string;
  description: string;
  id: string;
};

const initialState: PostState = {
  covers: [],
  coversUrl: [],
  title: '',
  description: '',
  id: '',
};

const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    resetFields: (state) => {
      state.covers = [];
      state.coversUrl = [];
      state.title = '';
      state.description = '';
      state.id = '';
    },
    addCover: (state, action: PayloadAction<string>) => {
      state.covers.push(action.payload);
    },
    deleteCover: (state, action: PayloadAction<string>) => {
      state.covers = state.covers.filter(cover => cover !== action.payload);
    },
    setCover: (state) => {
      state.covers = [];
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    addCoverUrl: (state, action: PayloadAction<[string, number]>) => {
      const [url, idx] = action.payload;

      state.coversUrl[idx] = url;
    },

    deleteCoverUrl: (state, action: PayloadAction<string>) => {
      state.coversUrl = state.coversUrl
        .filter(cover => cover !== action.payload);
    },
    setPostId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setCoverUrl: (state, action: PayloadAction<string[]>) => {
      state.coversUrl = action.payload;
    },
  },
});

export default PostSlice.reducer;
export const { actions } = PostSlice;
