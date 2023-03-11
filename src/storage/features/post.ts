/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PostState = {
  covers: string[];
  coversUrl: string[];
  title: string;
  descriptions: string[];
  id: string;
};

type DescriptionUpdate = {
  index: number,
  text: string,
};

const initialState: PostState = {
  covers: [],
  coversUrl: [],
  title: '',
  descriptions: [],
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
      state.descriptions = [];
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
    addDescription: (state, action: PayloadAction<string>) => {
      state.descriptions.push(...action.payload.split('//'));
    },
    setDescription: (state, action: PayloadAction<string[]>) => {
      state.descriptions = action.payload;
    },
    updateDescription: (state, action: PayloadAction<DescriptionUpdate>) => {
      state.descriptions = state.descriptions.map((descr, id) => {
        if (id === action.payload.index) {
          return action.payload.text;
        }

        return descr;
      });
    },

    addCoverUrl: (state, action: PayloadAction<string>) => {
      state.coversUrl.push(action.payload);
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
