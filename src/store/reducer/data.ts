import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Data {
  id: string;
  data: string;
}

export interface DataState {
  data: Data[];
}

const initialState: DataState = {
  data: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,

  reducers: {
    saveData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    addData: (state, action: PayloadAction<any>) => {
      state.data.push(action.payload);
    },
    deleteData: (state, action: PayloadAction<any>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const { saveData, addData, deleteData } = dataSlice.actions;
export default dataSlice.reducer;
