import type { IFilterOption } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const storedGenres = localStorage.getItem('genres');
interface GenreState {
  list: IFilterOption[];
}

const initialState: GenreState = {
  list: storedGenres ? JSON.parse(storedGenres) : [],
};
const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    updateGenre: (state, action: PayloadAction<IFilterOption[]>) => {
      state.list = action.payload;
      // Keep localStorage updated
      localStorage.setItem('genres', JSON.stringify(action.payload));
    },
  },
});

export const { updateGenre } = genreSlice.actions;
export default genreSlice;
