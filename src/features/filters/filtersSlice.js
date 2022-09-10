import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: "",
  colors: [],
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setChangedStatus: (state, action) => {
      state.status = action.payload;
    },
    setChangedColor: (state, action) => {
      console.log(action.payload)
      const { color, type } = action.payload;
      if(type === "add")
        state.colors.push(color)
      else if(type === "remove")
        state.colors = state.colors.filter(
            (existingColor) => existingColor !== color
        );
    },
  },
});

export const { setChangedStatus, setChangedColor } = filterSlice.actions;
export default filterSlice.reducer;
