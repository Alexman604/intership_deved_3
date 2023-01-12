import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  userImage: null,
  userIdLogged: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.userName = action.payload.userName;
      state.userImage = action.payload.userImage;
      state.userIdLogged = action.payload.userId;
    },
    logoutUser(state) {
      state.userName = null;
      state.userImage = null;
      state.userIdLogged = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
