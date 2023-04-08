import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: null,
  id: null,
  menuOpen: false,
  isFounder: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setUser(state, action) {
        state.email = action.payload.email
        state.token = action.payload.token
        state.id = action.payload.id
        localStorage.setItem('email', action.payload.email)
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('id', action.payload.id)
    },
    getUser(state) {
        state.email = localStorage.getItem('email')
        state.token = localStorage.getItem('token')
        state.id = localStorage.getItem('id')
    },
    removeUser(state) {
        state.email = null
        state.token = null
        state.id = null
        localStorage.clear()
    },
    setMenuOpen(state, action) {
      state.menuOpen = action.payload
  },
  setFounder(state, action) {
    state.isFounder = action.payload
},
  },
});

export const {
    setUser,
    getUser,
    removeUser,
    setMenuOpen,
    setFounder,
} = mainSlice.actions;

export default mainSlice.reducer;