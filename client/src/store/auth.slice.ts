import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  key: string | null;
}

const initialState: AuthState = {
  key: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
    },
    logout: (state) => {
      state.key = null;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
