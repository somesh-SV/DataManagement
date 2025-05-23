import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  selectedItem: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.list.push(action.payload);
    },
    selectItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    deleteItem: (state, action) => {
      state.list.splice(action.payload, 1); 
    },
    editItem: (state, action) => {
      const { index, updatedItem } = action.payload;
      state.list[index] = updatedItem;
    },
  },
});

export const { addItem, selectItem, deleteItem, editItem } = itemsSlice.actions;
export default itemsSlice.reducer;
