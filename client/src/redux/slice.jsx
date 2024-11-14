import { createSlice } from "@reduxjs/toolkit";
export const serviceSlice = createSlice({
  name: "service",
  initialState: {
    openAddPostModel: false,
    openEditProfileModel: false,
    anchorE1: null,
    anchorE2: null,
    darkMode: false,
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
      console.log("anchorE1 jis element ke pass open hoga" + action.payload);
      state.anchorE1 = action.payload;
    },
    toggleMyMenu: (state, action) => {
      console.log("anchorE2 jis element ke pass open hoga" + action.payload);
      state.anchorE2 = action.payload;
    },
    toggleThemeMode: (state, action) => {
      console.log("Dark mode changed to: " + !state.darkMode);
      state.darkMode = !state.darkMode;
    },
  },
});

export const {
  addPostModel,
  editProfileModel,
  toggleMainMenu,
  toggleMyMenu,
  toggleThemeMode,
} = serviceSlice.actions;
export default serviceSlice.reducer;
