import { createSlice } from "@reduxjs/toolkit";
export const serviceSlice = createSlice({
  name: "service",
  initialState: {
    openAddPostModel: false,
    openEditProfileModel: false,
    anchorE1: null,
  },
  reducers: {
    addPostModel: (state, action) => {
      console.log(action.payload);
      state.openAddPostModel = action.payload;
    },
    editProfileModel: (state, action) => {
      console.log(action.payload);
      state.openEditProfileModel = action.payload;
    },
    toggleMainMenu: (state, action) => {
      state.anchorE1 = action.payload;
    },
  },
});

export const { addPostModel, editProfileModel, toggleMainMenu } =
  serviceSlice.actions;
export default serviceSlice.reducer;
