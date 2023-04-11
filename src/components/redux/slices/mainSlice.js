import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: localStorage.getItem("email"),
  phone: localStorage.getItem("phone"),
  role: localStorage.getItem("role"),
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.id = action.payload.id;
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("phone", action.payload.phone);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("id", action.payload.id);
    },
    getUser(state) {
      state.email = localStorage.getItem("email");
      state.phone = localStorage.getItem("phone");
      state.role = localStorage.getItem("role");
      state.token = localStorage.getItem("token");
      state.id = localStorage.getItem("id");
    },
    removeUser(state) {
      state.email = null;
      state.phone = null;
      state.role = null;
      state.token = null;
      state.id = null;
      localStorage.clear();
    },
  },
});

export const { setUser, getUser, removeUser } = mainSlice.actions;

export default mainSlice.reducer;
