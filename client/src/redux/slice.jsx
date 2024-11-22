import { createSlice } from "@reduxjs/toolkit";
export const serviceSlice = createSlice({
  name: "service",
  initialState: {
    openAddPostModel: false,
    openEditProfileModel: false,
    anchorE1: null,
    anchorE2: null,
    darkMode: false,
    myInfo: null,
    user: {},
    allPosts: [],
    postId: null,
    searchedUsers: [],
    openBot: false,
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
    toggleThemeMode: (state) => {
      console.log("Dark mode changed to: " + !state.darkMode);
      state.darkMode = !state.darkMode;
    },
    addMyInfo: (state, action) => {
      if (action.payload === null) {
        state.myInfo = null;
        console.log("User logged out. myInfo set to null.");
      } else {
        console.log("add my info: " + action.payload.me);
        state.myInfo = action.payload.me;
      }
    },
    addUser: (state, action) => {
      state.user = action.payload;
    },
    addSingle: (state, action) => {
      let newArr = [...state.allPosts];
      let updatedArr = [action.payload.newPost, ...newArr];
      let uniqueArr = new Set();
      let uniquePosts = updatedArr.filter((e) => {
        if (!uniqueArr.has(e.id)) {
          // unique array ke andar sirf wahi id ka element aayega jo id ka element updatedArr me present hoga(only unique elements):-
          uniqueArr.add(e);
          return true;
        }
        return false;
      });
      state.allPosts = [...uniquePosts];
    },

    addToAllPost: (state, action) => {
      // this logic prevent the code from duplicate:-
      console.log("addToAllPost ke slice ka code hai" + action.payload);
      const newPostArr = [...action.payload.posts];
      console.log(state.allPosts.length);
      if (state?.allPosts?.length === 0) {
        state.allPosts = newPostArr;
        console.log("newPostArr: " + JSON.stringify(newPostArr));
        return;
      }
      const existingPosts = [...state.allPosts];
      newPostArr.forEach((e) => {
        const existingIndex = existingPosts.findIndex((i) => {
          return i._id === e._id;
        });
        if (existingIndex !== -1) {
          existingPosts[existingIndex] = e;
        } else {
          existingPosts.push(e);
        }
      });
      state.allPosts = existingPosts;
      console.log("existingPosts: " + JSON.stringify(existingPosts));
    },

    deleteThePost: (state, action) => {
      let postArr = [...state.allPosts];
      let newArr = postArr.filter((e) => e._id !== state.postId);
      state.allPosts = newArr;
    },

    addPostId: (state, action) => {
      state.postId = action.payload;
    },

    addToSearchedUsers: (state, action) => {
      state.searchedUsers = action.payload;
    },
    toggleChatBot: (state) => {
      console.log("openBot changed to: " + !state.openBot);
      state.openBot = !state.openBot;
    },
  },
});

export const {
  addPostModel,
  editProfileModel,
  toggleMainMenu,
  toggleMyMenu,
  toggleThemeMode,
  addMyInfo,
  addUser,
  addToAllPost,
  addSingle,
  deleteThePost,
  addPostId,
  addToSearchedUsers,
  searchedUsers,
  toggleChatBot,
} = serviceSlice.actions;
export default serviceSlice.reducer;
