import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.mode = "light";
      state.posts = [];
    },
    setFriends: (state, action) => {
      if (state.user) {        //we are checking if user is there or not in state by setlogin()
        state.user.friends = action.payload.friends;    //if user is exists, set friends for that user
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      // Sorting posts by createdAt date in descending order (newest first)
      const sortedPosts = action.payload.posts.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt));
      
      // Setting the sorted posts to the state
      state.posts = sortedPosts;
  },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
